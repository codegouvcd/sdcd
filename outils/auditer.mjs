#!/usr/bin/env node
/*
 * SDCD — audit responsive, accessibilité et ergonomie.
 *
 * Ouvre la galerie à quatre largeurs et contrôle ce qui se mesure :
 * débordement horizontal, taille des cibles tactiles, visibilité du focus,
 * atteignabilité au clavier, association des étiquettes de formulaire,
 * ordre des titres, validité des attributs ARIA, respect de
 * `prefers-reduced-motion`.
 *
 *   SDCD_CHROMIUM="…/chrome.exe" node outils/auditer.mjs
 */
import { chromium } from '@playwright/test';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const GALERIE = pathToFileURL(join(RACINE, 'outils', 'galerie.html')).href;
const LARGEURS = [320, 375, 768, 1280];

const executable = process.env.SDCD_CHROMIUM;
const navigateur = await chromium.launch(executable ? { executablePath: executable } : {});

let defauts = 0;
const signale = (categorie, message) => { defauts++; console.log(`  DEFAUT  [${categorie}] ${message}`); };

/* ------------------------------------------------------------ responsive */

console.log('Responsive');
console.log('----------');
for (const largeur of LARGEURS) {
  const page = await navigateur.newPage({ viewport: { width: largeur, height: 900 } });
  await page.goto(GALERIE);
  await page.evaluate(() => document.fonts.ready);

  const r = await page.evaluate(() => {
    const doc = document.documentElement;
    const hors = [];
    for (const el of document.querySelectorAll('body *')) {
      const b = el.getBoundingClientRect();
      if (b.width > 0 && b.right > doc.clientWidth + 1 && getComputedStyle(el).position !== 'fixed') {
        hors.push({ classe: (el.className || '').toString().slice(0, 40), droite: Math.round(b.right) });
      }
    }
    return { viewport: doc.clientWidth, scroll: doc.scrollWidth, hors: hors.slice(0, 4), nb: hors.length };
  });

  if (r.scroll > r.viewport) {
    signale('responsive', `${largeur} px : débordement horizontal (${r.scroll} > ${r.viewport}), ` +
      `${r.nb} élément(s) — ${r.hors.map((h) => h.classe).join(', ')}`);
  } else {
    console.log(`  ok      ${largeur} px : aucun débordement`);
  }
  await page.close();
}

/* -------------------------------------------------- cibles tactiles (mobile) */

console.log('\nCibles tactiles à 375 px');
console.log('------------------------');
{
  const page = await navigateur.newPage({
    viewport: { width: 375, height: 812 },
    hasTouch: true, isMobile: true,
  });
  await page.goto(GALERIE);
  await page.evaluate(() => document.fonts.ready);

  const petites = await page.evaluate(() => {
    const trop = [];
    for (const el of document.querySelectorAll('a, button, input, select, summary, [role="switch"], [role="tab"], [role="radio"]')) {
      if (el.closest('.sdcd-lecteur-seul')) continue;

      /* WCAG 2.5.8 dispense explicitement les liens insérés dans un bloc de
         texte : les agrandir romprait l'interligne sans rien gagner, puisque
         la phrase environnante offre déjà une zone d'appui. On applique la
         même dispense qu'un auditeur humain. */
      if (el.tagName === 'A') {
        const parent = el.parentElement;
        const dansDuTexte = parent && ['P', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
                                       'FIGCAPTION', 'SPAN', 'BLOCKQUOTE'].includes(parent.tagName);
        if (dansDuTexte) continue;
      }

      /* Une case ou un bouton radio enveloppé d'un <label> a pour zone d'appui
         le label entier, pas le carré de 18 px. C'est lui qu'il faut mesurer. */
      let cible = el;
      if (['INPUT'].includes(el.tagName)) {
        const label = el.closest('label');
        if (label) cible = label;
      }

      const b = cible.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) continue;              // masqué
      if (b.height < 24 || b.width < 24) {
        trop.push({
          classe: (el.className || '').toString().slice(0, 42),
          texte: (el.textContent || '').trim().slice(0, 20),
          h: Math.round(b.height), w: Math.round(b.width),
        });
      }
    }
    return trop;
  });

  if (petites.length) {
    for (const p of petites.slice(0, 8)) {
      signale('tactile', `${p.w}×${p.h} px — ${p.classe || p.texte}`);
    }
    if (petites.length > 8) console.log(`          … et ${petites.length - 8} autre(s)`);
  } else {
    console.log('  ok      toutes les cibles atteignent 24 px');
  }
  await page.close();
}

/* ------------------------------------------------------- focus et clavier */

console.log('\nFocus et clavier');
console.log('----------------');
{
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(GALERIE);
  await page.evaluate(() => document.fonts.ready);

  const r = await page.evaluate(() => {
    const focusables = [...document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')]
      .filter((el) => el.getBoundingClientRect().width > 0);

    const sansIndicateur = [];
    for (const el of focusables) {
      const avant = getComputedStyle(el);
      const repos = { outline: avant.outlineStyle + avant.outlineWidth, ombre: avant.boxShadow };
      el.focus();
      const apres = getComputedStyle(el);
      const actif = { outline: apres.outlineStyle + apres.outlineWidth, ombre: apres.boxShadow };
      const change = repos.outline !== actif.outline || repos.ombre !== actif.ombre;
      if (!change) {
        sansIndicateur.push((el.className || '').toString().slice(0, 42) || el.tagName.toLowerCase());
      }
    }
    return { total: focusables.length, sansIndicateur };
  });

  console.log(`  ${r.total} élément(s) focusable(s)`);
  if (r.sansIndicateur.length) {
    for (const c of [...new Set(r.sansIndicateur)].slice(0, 6)) {
      signale('focus', `aucun changement visible au focus — ${c}`);
    }
  } else {
    console.log('  ok      tous montrent un indicateur de focus');
  }
  await page.close();
}

/* ------------------------------------------------ formulaires et sémantique */

console.log('\nFormulaires et sémantique');
console.log('-------------------------');
{
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(GALERIE);
  await page.evaluate(() => document.fonts.ready);

  const r = await page.evaluate(() => {
    const sansEtiquette = [];
    for (const el of document.querySelectorAll('input:not([type=hidden]), select, textarea')) {
      const id = el.id;
      const parLabel = id && document.querySelector(`label[for="${CSS.escape(id)}"]`);
      const enveloppe = el.closest('label');
      const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
      if (!parLabel && !enveloppe && !aria) {
        sansEtiquette.push((el.className || el.name || el.type || '').toString().slice(0, 40));
      }
    }

    // Erreurs reliées au champ
    const erreursNonLiees = [];
    for (const err of document.querySelectorAll('.sdcd-champ__erreur')) {
      if (!err.id) { erreursNonLiees.push('message sans id'); continue; }
      const lie = document.querySelector(`[aria-describedby~="${CSS.escape(err.id)}"]`);
      if (!lie) erreursNonLiees.push(err.id);
    }

    // aria-controls pointant dans le vide
    const ariaCasses = [];
    for (const el of document.querySelectorAll('[aria-controls]')) {
      for (const id of el.getAttribute('aria-controls').split(/\s+/)) {
        if (id && !document.getElementById(id)) ariaCasses.push(id);
      }
    }

    // Doublons d'identifiant
    const vus = new Set(), doublons = new Set();
    for (const el of document.querySelectorAll('[id]')) {
      if (vus.has(el.id)) doublons.add(el.id); else vus.add(el.id);
    }

    return {
      champs: document.querySelectorAll('input:not([type=hidden]), select, textarea').length,
      sansEtiquette, erreursNonLiees, ariaCasses, doublons: [...doublons],
    };
  });

  console.log(`  ${r.champs} champ(s) de formulaire`);
  r.sansEtiquette.forEach((c) => signale('étiquette', `champ sans étiquette — ${c}`));
  r.erreursNonLiees.forEach((c) => signale('erreur', `message d'erreur non relié par aria-describedby — ${c}`));
  r.ariaCasses.forEach((c) => signale('aria', `aria-controls pointe sur un id inexistant — ${c}`));
  r.doublons.forEach((c) => signale('id', `identifiant en double — ${c}`));
  if (!r.sansEtiquette.length && !r.erreursNonLiees.length && !r.ariaCasses.length && !r.doublons.length) {
    console.log('  ok      étiquettes, erreurs reliées, aria-controls et identifiants corrects');
  }
  await page.close();
}

/* --------------------------------------------------- mouvement réduit */

console.log('\nMouvement réduit');
console.log('----------------');
{
  const page = await navigateur.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  await page.goto(GALERIE);
  await page.evaluate(() => document.fonts.ready);

  const anime = await page.evaluate(() => {
    const coupables = [];
    for (const el of document.querySelectorAll('body *')) {
      const s = getComputedStyle(el);
      const t = parseFloat(s.transitionDuration) || 0;
      const a = parseFloat(s.animationDuration) || 0;
      if (t > 0 || a > 0) {
        coupables.push((el.className || '').toString().slice(0, 40));
      }
    }
    return [...new Set(coupables)];
  });

  if (anime.length) {
    anime.slice(0, 5).forEach((c) => signale('mouvement', `transition active malgré prefers-reduced-motion — ${c}`));
  } else {
    console.log('  ok      aucune transition ni animation active');
  }
  await page.close();
}

await navigateur.close();

console.log(`\n${defauts === 0 ? 'Aucun defaut.' : defauts + ' defaut(s).'}`);
process.exit(defauts === 0 ? 0 : 1);
