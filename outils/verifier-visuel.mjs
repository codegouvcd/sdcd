#!/usr/bin/env node
/*
 * SDCD — non-régression visuelle.
 *
 * Ouvre la galerie dans un Chromium sans interface, relève pour chaque
 * composant les propriétés calculées qui portent l'identité visuelle, et
 * compare à la référence.
 *
 * Pourquoi des propriétés et non des captures d'écran : une capture diffère
 * d'une machine à l'autre — lissage des polices, échelle, version du moteur —
 * et produit des faux positifs permanents. Les valeurs calculées, elles, sont
 * stables et disent précisément ce qui a bougé : « la couleur du bouton
 * primaire est passée de X à Y », pas « 0,3 % de pixels ont changé ».
 *
 * Les dimensions sont volontairement exclues : elles dépendent du viewport.
 *
 *   node outils/verifier-visuel.mjs            compare à la référence
 *   node outils/verifier-visuel.mjs --figer    (re)fige la référence
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const GALERIE = join(RACINE, 'outils', 'galerie.html');
const REFERENCE = join(RACINE, 'outils', 'reference-visuelle.json');
const FIGER = process.argv.includes('--figer');

/* Les propriétés relevées. Toutes portent l'identité visuelle et aucune ne
   dépend de la largeur de la fenêtre. */
const PROPRIETES = [
  'color', 'backgroundColor', 'borderTopColor', 'borderTopWidth', 'borderTopStyle',
  'borderRadius', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
  'letterSpacing', 'textDecorationLine', 'paddingTop', 'paddingLeft',
  'textTransform', 'opacity',
];

async function relever(page) {
  return page.evaluate((props) => {
    const releve = {};
    for (const bloc of document.querySelectorAll('[data-composant]')) {
      const cle = bloc.dataset.composant;
      const sujet = bloc.querySelector('.galerie__sujet');
      const noeuds = {};
      // On relève la racine du composant et ses descendants porteurs de classe.
      const cibles = [sujet, ...sujet.querySelectorAll('[class*="sdcd-"]')];
      for (const el of cibles) {
        const nom = (el.className || '').toString().trim().split(/\s+/).filter(Boolean).join('.');
        if (!nom) continue;
        const s = getComputedStyle(el);
        const valeurs = {};
        for (const p of props) valeurs[p] = s[p];
        // Une même classe peut apparaître plusieurs fois : on garde la première.
        if (!noeuds[nom]) noeuds[nom] = valeurs;
      }
      releve[cle] = noeuds;
    }
    return releve;
  }, PROPRIETES);
}

function comparer(ref, actuel) {
  const ecarts = [];
  for (const [composant, noeuds] of Object.entries(ref)) {
    if (!(composant in actuel)) {
      ecarts.push({ composant, quoi: 'composant absent de la galerie' });
      continue;
    }
    for (const [noeud, valeurs] of Object.entries(noeuds)) {
      const maintenant = actuel[composant][noeud];
      if (!maintenant) {
        ecarts.push({ composant, noeud, quoi: 'élément absent' });
        continue;
      }
      for (const [prop, avant] of Object.entries(valeurs)) {
        if (maintenant[prop] !== avant) {
          ecarts.push({ composant, noeud, quoi: prop, avant, apres: maintenant[prop] });
        }
      }
    }
  }
  for (const composant of Object.keys(actuel)) {
    if (!(composant in ref)) ecarts.push({ composant, quoi: 'composant nouveau, absent de la référence' });
  }
  return ecarts;
}

/* Playwright réclame la version de Chromium qu'il a lui-même téléchargée. Sur
   un poste où un autre build est déjà présent, on le désigne plutôt que d'en
   télécharger un second : `SDCD_CHROMIUM` accepte un chemin d'exécutable.
   Sans cette variable, Playwright suit son comportement habituel. */
const executable = process.env.SDCD_CHROMIUM;
const navigateur = await chromium.launch(executable ? { executablePath: executable } : {});
const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(pathToFileURL(GALERIE).href);
await page.waitForLoadState('networkidle');
await page.evaluate(() => document.fonts.ready);

const releves = {};
for (const theme of ['clair', 'sombre']) {
  await page.evaluate((t) => {
    const R = document.documentElement;
    R.classList.add('sdcd-sans-transition');
    if (t === 'sombre') R.setAttribute('data-theme', 'dark');
    else R.removeAttribute('data-theme');
    R.offsetHeight;
    R.classList.remove('sdcd-sans-transition');
  }, theme);
  await page.waitForTimeout(300);
  releves[theme] = await relever(page);
}
await navigateur.close();

const nbNoeuds = Object.values(releves.clair).reduce((n, c) => n + Object.keys(c).length, 0);

if (FIGER || !existsSync(REFERENCE)) {
  writeFileSync(REFERENCE, JSON.stringify(releves, null, 1), 'utf8');
  console.log(`Référence figée : ${Object.keys(releves.clair).length} composants, ` +
              `${nbNoeuds} éléments, 2 thèmes, ${PROPRIETES.length} propriétés chacun.`);
  process.exit(0);
}

const reference = JSON.parse(readFileSync(REFERENCE, 'utf8'));
let total = 0;
for (const theme of ['clair', 'sombre']) {
  const ecarts = comparer(reference[theme] ?? {}, releves[theme]);
  total += ecarts.length;
  console.log(`\nThème ${theme} — ${ecarts.length} écart(s)`);
  for (const e of ecarts.slice(0, 25)) {
    if (e.avant !== undefined) {
      console.log(`  ${e.composant} / ${e.noeud}\n    ${e.quoi} : ${e.avant} → ${e.apres}`);
    } else {
      console.log(`  ${e.composant}${e.noeud ? ' / ' + e.noeud : ''} : ${e.quoi}`);
    }
  }
  if (ecarts.length > 25) console.log(`  … et ${ecarts.length - 25} autre(s)`);
}

console.log(total === 0
  ? `\nAucune dérive visuelle. ${Object.keys(releves.clair).length} composants, ${nbNoeuds} éléments contrôlés.`
  : `\n${total} écart(s). Si le changement est voulu : node outils/verifier-visuel.mjs --figer`);
process.exit(total === 0 ? 0 : 1);
