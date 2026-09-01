#!/usr/bin/env node
/* SDCD — construction du fichier de distribution.
 *
 * Résout la chaîne d'`@import` de styles.css en un seul fichier, et en produit
 * une version compactée. Objectif : un intégrateur ne charge qu'une feuille au
 * lieu de dix requêtes en cascade.
 *
 * Aucune dépendance : la compaction est volontairement conservatrice — retrait
 * des commentaires et des espaces superflus, rien qui puisse altérer le rendu.
 *
 * Usage : node outils/construire.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RACINE, 'dist');

/** Résout récursivement les @import, en réécrivant les url() relatives. */
function aplatir(chemin, vus = new Set()) {
  const abs = resolve(chemin);
  if (vus.has(abs)) return '';
  vus.add(abs);

  const base = dirname(abs);
  let css = readFileSync(abs, 'utf8');

  css = css.replace(/@import\s+url\(["']?([^"')]+)["']?\)\s*;/g, (_, ref) => {
    const inclus = join(base, ref);
    if (!existsSync(inclus)) {
      console.warn(`  ! import introuvable, ignoré : ${ref}`);
      return '';
    }
    return `\n/* ← ${ref} */\n` + aplatir(inclus, vus);
  });

  // Le fichier construit vit à la racine de dist/. Toute url() relative doit
  // donc être réécrite depuis le dossier du fichier qui la déclarait, sans
  // exception : `fontes/x` écrit dans assets/ vaut `assets/fontes/x` à
  // l'arrivée. Omettre ce cas fait échouer le chargement des fontes en
  // silence — le texte s'affiche, mais dans une police de repli.
  const relatif = base.replace(RACINE, '').replace(/\\/g, '/').replace(/^\//, '');
  if (relatif) {
    css = css.replace(/url\((["']?)(?!data:|https?:|\/)([^"')]+)\1\)/g,
      (_, q, u) => `url(${q}${relatif}/${u}${q})`);
  }
  return css;
}

function compacter(css) {
  return css
    .replace(/\/\*[^!][\s\S]*?\*\//g, '')   // commentaires, sauf /*! … */
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

console.log('Construction du SDCD\n');

mkdirSync(DIST, { recursive: true });

const complet = aplatir(join(RACINE, 'styles.css'));
const banniere = complet.match(/\/\*![\s\S]*?\*\//)?.[0] ?? '';
const compact = banniere + compacter(complet);

writeFileSync(join(DIST, 'sdcd.css'), complet, 'utf8');
writeFileSync(join(DIST, 'sdcd.min.css'), compact, 'utf8');
copyFileSync(join(RACINE, 'sdcd.js'), join(DIST, 'sdcd.js'));

// Les fontes et le fichier d'icônes accompagnent la feuille.
mkdirSync(join(DIST, 'assets', 'fontes'), { recursive: true });
for (const f of readdirSync(join(RACINE, 'assets', 'fontes'))) {
  copyFileSync(join(RACINE, 'assets', 'fontes', f), join(DIST, 'assets', 'fontes', f));
}
for (const f of ['armoiries-rdc.png', 'logo-blanc-tricolore.png']) {
  copyFileSync(join(RACINE, 'assets', f), join(DIST, 'assets', f));
}

// L'adaptateur Django (adaptateurs/django-admin) embarque la feuille, les
// fontes et les armoiries dans les fichiers statiques de son application, pour
// que `collectstatic` suffise a l'installer.
const ADMIN = join(RACINE, 'adaptateurs', 'django-admin', 'sdcd_admin', 'static', 'sdcd_admin');
mkdirSync(join(ADMIN, 'assets', 'fontes'), { recursive: true });
copyFileSync(join(DIST, 'sdcd.css'), join(ADMIN, 'sdcd.css'));
copyFileSync(join(RACINE, 'assets', 'armoiries-rdc.png'), join(ADMIN, 'armoiries-rdc.png'));
for (const f of readdirSync(join(RACINE, 'assets', 'fontes'))) {
  copyFileSync(join(RACINE, 'assets', 'fontes', f), join(ADMIN, 'assets', 'fontes', f));
}

// Toute url() du fichier construit doit pointer sur un fichier réellement
// présent dans dist/. Un chemin cassé ne provoque aucune erreur visible : la
// page s'affiche avec une police de repli. Ce contrôle est donc indispensable.
const refs = [...new Set([...compact.matchAll(/url\((["']?)(?!data:|https?:)([^"')]+)\1\)/g)]
  .map((m) => m[2]))];
const manquants = refs.filter((r) => !existsSync(join(DIST, r)));
if (manquants.length) {
  console.error(`\n  ${manquants.length} ressource(s) introuvable(s) dans dist/ :`);
  manquants.forEach((m) => console.error(`    ${m}`));
  process.exit(1);
}

const ko = (n) => Math.round(n / 1024);
console.log(`  dist/sdcd.css      ${ko(complet.length).toString().padStart(5)} Ko`);
console.log(`  dist/sdcd.min.css  ${ko(compact.length).toString().padStart(5)} Ko  (${Math.round(100 - compact.length / complet.length * 100)} % de moins)`);
console.log(`  dist/sdcd.js       ${ko(readFileSync(join(RACINE, 'sdcd.js')).length).toString().padStart(5)} Ko`);
console.log(`  dist/assets/       fontes et marque d'État`);
console.log(`  adaptateurs/django-admin/sdcd_admin/static/  feuille, fontes et armoiries recopiees`);
console.log('\nUne seule feuille à charger, aucune requête vers un tiers.');
