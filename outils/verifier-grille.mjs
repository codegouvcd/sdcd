import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
// La grille est le seul composant dont le comportement depend entierement du
// point de rupture : une regle manquante ne se voit pas a 1280 px. Ce controle
// mesure donc les deux largeurs, et a effectivement attrape deux defauts —
// colonnes md non repliees sous 900 px, et decalage ecrase par le raccourci
// grid-column.
const racine = process.argv[2] || new URL('..', import.meta.url).pathname;
const b = await chromium.launch({ executablePath: process.env.SDCD_CHROMIUM });
let echecs = 0;
for (const [largeur, attendu] of [[1280, 'bureau'], [375, 'mobile']]) {
  const p = await b.newPage({ viewport: { width: largeur, height: 900 } });
  await p.goto(pathToFileURL(join(racine, 'outils', 'grille.html')).href);
  const r = await p.evaluate(() => {
    const g = document.getElementById('g');
    const l = g.getBoundingClientRect().width;
    return [...g.children].map(e => ({
      cls: e.className,
      part: Math.round(e.getBoundingClientRect().width / l * 12 * 10) / 10,
      gauche: Math.round(e.getBoundingClientRect().left - g.getBoundingClientRect().left),
    }));
  });
  console.log(`  --- ${attendu} (${largeur} px) ---`);
  for (const x of r) console.log(`    ${x.cls.padEnd(38)} ~${x.part} col   x=${x.gauche}`);
  // a 375 px, toutes les colonnes md doivent occuper 12 colonnes
  if (largeur === 375) {
    const mauvais = r.filter(x => x.cls.includes('md') && x.part < 11.5);
    if (mauvais.length) { console.log(`    ECHEC : ${mauvais.length} colonne(s) md non repliee(s)`); echecs++; }
    else console.log('    ok : toutes les colonnes md se replient sur 12');
  } else {
    const six = r.filter(x => x.cls.includes('col-md-6'));
    if (six.length === 2 && six.every(x => Math.abs(x.part - 6) < 0.3)) console.log('    ok : col-md-6 occupe bien 6 colonnes');
    else { console.log('    ECHEC : col-md-6 ne fait pas 6 colonnes'); echecs++; }
  }
  await p.close();
}
await b.close();
process.exit(echecs ? 1 : 0);
