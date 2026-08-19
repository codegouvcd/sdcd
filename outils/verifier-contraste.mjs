#!/usr/bin/env node
/* SDCD — vérificateur du contrat d'accessibilité des couleurs.
   Lit tokens/colors.css et contrôle chaque paire porteuse de sens.
   Aucune dépendance. Usage : node outils/verifier-contraste.mjs */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(racine, 'tokens/colors.css'), 'utf8');

/** Extrait les jetons d'un bloc (:root ou [data-theme="dark"]) et résout les alias var(). */
function jetons(selecteur) {
  const bloc = css.split(selecteur)[1]?.split('}')[0] ?? '';
  const brut = {};
  for (const [, nom, val] of bloc.matchAll(/(--sdcd-[a-z0-9-]+)\s*:\s*([^;]+);/g)) brut[nom] = val.trim();
  const base = selecteur === ':root' ? {} : jetons(':root');
  const table = { ...base, ...brut };
  const resoudre = (v, profondeur = 0) => {
    if (profondeur > 10) throw new Error('alias circulaire : ' + v);
    const m = v.match(/^var\((--sdcd-[a-z0-9-]+)\)$/);
    return m ? resoudre(table[m[1]], profondeur + 1) : v;
  };
  return Object.fromEntries(Object.entries(table).map(([k, v]) => [k, resoudre(v)]));
}

const lin = (c) => (c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
function luminance(hex) {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error('couleur non résolue : ' + hex);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/* Paires à vérifier. seuil 4.5 = texte (WCAG 1.4.3) ; 3 = bordure de contrôle
   et information graphique (WCAG 1.4.11). */
const CONTRAT = [
  ['texte courant sur fond',            '--sdcd-texte',       '--sdcd-fond',        4.5],
  ['texte secondaire sur fond',         '--sdcd-texte-2',     '--sdcd-fond',        4.5],
  ['texte secondaire sur fond-alt',     '--sdcd-texte-2',     '--sdcd-fond-alt',    4.5],
  ['lien / action sur fond',            '--sdcd-action',      '--sdcd-fond',        4.5],
  ['lien / action sur fond-alt',        '--sdcd-action',      '--sdcd-fond-alt',    4.5],
  ['lien / action sur bleu-pale',       '--sdcd-action',      '--sdcd-bleu-pale',   4.5],
  ['action survol sur fond',            '--sdcd-action-survol', '--sdcd-fond',      4.5],
  ['action appui sur fond',             '--sdcd-action-appui',  '--sdcd-fond',      4.5],
  ['bouton primaire : texte sur aplat', '--sdcd-sur-action',  '--sdcd-action',      4.5],
  ['bouton primaire survol',            '--sdcd-sur-action',  '--sdcd-action-survol', 4.5],
  ['bouton primaire appui',             '--sdcd-sur-action',  '--sdcd-action-appui',  4.5],
  ['infobulle : texte sur encre',       '--sdcd-sur-encre',   '--sdcd-encre',       4.5],
  ['succès sur fond',                   '--sdcd-succes',      '--sdcd-fond',        4.5],
  ['succès sur son fond pâle',          '--sdcd-succes',      '--sdcd-succes-pale', 4.5],
  ['info sur fond',                     '--sdcd-info',        '--sdcd-fond',        4.5],
  ['info sur son fond pâle',            '--sdcd-info',        '--sdcd-info-pale',   4.5],
  ['alerte sur fond',                   '--sdcd-alerte',      '--sdcd-fond',        4.5],
  ['alerte sur son fond pâle',          '--sdcd-alerte',      '--sdcd-alerte-pale', 4.5],
  ['erreur sur fond',                   '--sdcd-erreur',      '--sdcd-fond',        4.5],
  ['erreur sur son fond pâle',          '--sdcd-erreur',      '--sdcd-erreur-pale', 4.5],
  ['erreur en aplat (bouton destructif)', '--sdcd-sur-action', '--sdcd-erreur',     4.5],
  ['bordure de contrôle sur fond',      '--sdcd-ligne-forte', '--sdcd-fond',        3],
  ['bordure de contrôle sur fond-alt',  '--sdcd-ligne-forte', '--sdcd-fond-alt',    3],
  ['bordure de champ au focus',         '--sdcd-action',      '--sdcd-fond',        3],
  /* Surface teintée du bandeau Notice : la couleur d'action n'y suffit pas,
     les liens y basculent sur la teinte de survol. */
  ['lien sur bandeau teinté',           '--sdcd-action-survol', '--sdcd-bleu-teinte', 4.5],
  ['texte sur bandeau teinté',          '--sdcd-encre',       '--sdcd-bleu-teinte', 4.5],
  ['série de graphique 1 sur fond',     '--sdcd-chart-1',     '--sdcd-fond',         3],
  ['série de graphique 2 sur fond',     '--sdcd-chart-2',     '--sdcd-fond',         3],
  ['série de graphique 3 sur fond',     '--sdcd-chart-3',     '--sdcd-fond',         3],
  ['série de graphique 4 sur fond',     '--sdcd-chart-4',     '--sdcd-fond',         3],
  ['série de graphique 5 sur fond',     '--sdcd-chart-5',     '--sdcd-fond',         3],
  ['série de graphique 6 sur fond',     '--sdcd-chart-6',     '--sdcd-fond',         3],
  ['badge nouveau sur son fond',        '--sdcd-nouveau',     '--sdcd-nouveau-pale', 4.5],
  ['badge info sur son fond',           '--sdcd-bleu-profond','--sdcd-info-pale',    4.5],
  ['étiquette sur fond bleu pâle',      '--sdcd-bleu-profond','--sdcd-bleu-pale',    4.5],
  ['icône Notice sur bleu teinté',      '--sdcd-bleu-profond','--sdcd-bleu-teinte',  3],
  /* Aplat de marque : invariant, il porte du blanc dans les deux thèmes. */
  ['blanc sur aplat de marque',         '#FFFFFF',            '--sdcd-bleu-aplat',  4.5],
  ['aplat de marque en texte sur blanc','--sdcd-bleu-aplat',  '#FFFFFF',            4.5],
];

/* La teinte de marque est volontairement hors contrat : elle ne porte jamais de
   texte. On vérifie l'inverse — qu'elle n'a pas été réintroduite comme action. */
const INVARIANTS = [
  ['la teinte de marque ne doit pas servir d\'action', (t) => t['--sdcd-action'] !== t['--sdcd-bleu']],
];

let echecs = 0;
for (const theme of [':root', '[data-theme="dark"]']) {
  const t = jetons(theme);
  console.log(`\n${theme === ':root' ? 'THÈME CLAIR' : 'THÈME SOMBRE'}`);
  const val = (k) => (k.startsWith('#') ? k : t[k]);
  for (const [nom, a, b, seuil] of CONTRAT) {
    const r = ratio(val(a), val(b));
    const ok = r >= seuil;
    if (!ok) echecs++;
    console.log(`  ${ok ? '  ok' : 'ÉCHEC'}  ${r.toFixed(2).padStart(5)}:1  (min ${seuil})  ${nom}`);
  }
  for (const [nom, test] of INVARIANTS) {
    const ok = test(t);
    if (!ok) echecs++;
    console.log(`  ${ok ? '  ok' : 'ÉCHEC'}          invariant : ${nom}`);
  }
}
console.log(echecs === 0
  ? '\nContrat d\'accessibilité respecté.'
  : `\n${echecs} violation(s) du contrat d'accessibilité.`);
process.exit(echecs === 0 ? 0 : 1);
