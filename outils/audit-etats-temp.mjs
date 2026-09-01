/* Capture les ETATS que les sondes au repos ne voient jamais :
 * menu deplie, sous-menus, page de connexion, back-office.
 * Mesure aussi les chevauchements reels entre elements visibles. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const PUB = "sdcd-72-60-188-156.sslip.io";
const ADM = "admin-72-60-188-156.sslip.io";
const SORTIE = process.env.CAPTURES || "./captures";
mkdirSync(SORTIE, { recursive: true });

const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: [`--host-resolver-rules=MAP ${PUB} 127.0.0.1:8443,MAP ${ADM} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true });
const p = await c.newPage();

/* Deux elements se chevauchent si leurs rectangles se croisent sans que l'un
 * contienne l'autre et sans lien de parente. On ignore ce qui est positionne
 * hors flux a dessein (menus deroulants ouverts, modales). */
const CHEVAUCHEMENTS = () => {
  const visibles = [...document.querySelectorAll("body *")].filter((e) => {
    const s = getComputedStyle(e);
    if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) return false;
    const r = e.getBoundingClientRect();
    return r.width > 8 && r.height > 8;
  });
  const nom = (e) =>
    e.tagName.toLowerCase() + (e.className ? "." + e.className.toString().trim().split(/\s+/)[0] : "");
  const horsFlux = (e) => {
    for (let n = e; n; n = n.parentElement) {
      const pos = getComputedStyle(n).position;
      if (pos === "absolute" || pos === "fixed" || pos === "sticky") return true;
    }
    return false;
  };
  const out = [];
  for (let i = 0; i < visibles.length; i++) {
    const a = visibles[i];
    if (horsFlux(a)) continue;
    const ra = a.getBoundingClientRect();
    for (let j = i + 1; j < visibles.length; j++) {
      const d = visibles[j];
      if (a.contains(d) || d.contains(a)) continue;
      if (horsFlux(d)) continue;
      const rd = d.getBoundingClientRect();
      const ix = Math.min(ra.right, rd.right) - Math.max(ra.left, rd.left);
      const iy = Math.min(ra.bottom, rd.bottom) - Math.max(ra.top, rd.top);
      if (ix > 4 && iy > 4) {
        out.push(`${nom(a)} x ${nom(d)} — ${Math.round(ix)}x${Math.round(iy)}px`);
      }
    }
  }
  return [...new Set(out)].slice(0, 10);
};

/* Une liste de navigation empilee doit avoir tous ses items au meme bord gauche.
 * S'ils se repartissent sur plusieurs colonnes, la disposition n'est pas celle
 * voulue — c'est ce qui donnait, sur le menu mobile, des entrees deux par deux
 * dont les filets de separation se croisaient. Un tel defaut n'est PAS un
 * chevauchement geometrique : les boites ne se croisent pas. */
const EMPILEMENT = (sel) => {
  const l = document.querySelector(sel);
  if (!l) return { cible: sel, etat: "absente" };
  const items = [...l.children].filter((e) => e.getBoundingClientRect().height > 0);
  const gauches = [...new Set(items.map((e) => Math.round(e.getBoundingClientRect().left)))];
  return {
    cible: sel,
    items: items.length,
    colonnes: gauches.length,
    empile: gauches.length <= 1,
  };
};

/* Un formulaire est « excentre » si ses marges gauche et droite different
 * nettement alors qu'il ne remplit pas la largeur. */
const CENTRAGE = (sel) => {
  const e = document.querySelector(sel);
  if (!e) return { cible: sel, etat: "absente" };
  const r = e.getBoundingClientRect();
  const gauche = Math.round(r.left);
  const droite = Math.round(document.documentElement.clientWidth - r.right);
  return {
    cible: sel,
    largeur: Math.round(r.width),
    gauche,
    droite,
    ecart: Math.abs(gauche - droite),
    fenetre: document.documentElement.clientWidth,
  };
};

async function etat(nom, url, largeur, avant) {
  await p.setViewportSize({ width: largeur, height: 900 });
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(600);
  if (avant) await avant();
  await p.waitForTimeout(500);
  const ch = await p.evaluate(CHEVAUCHEMENTS);
  console.log(`\n${nom} (${largeur}px)`);
  console.log("  chevauchements :", ch.length ? ch : "aucun");
  await p.screenshot({ path: `${SORTIE}/etat-${nom.replace(/[^a-z0-9]+/gi, "-")}-${largeur}.png`, fullPage: false });
  return ch;
}

// ------------------------------------------------------- page de connexion
for (const l of [1280, 375]) {
  await etat("connexion", `https://${ADM}/cms-admin/login/`, l);
  console.log("  centrage :", JSON.stringify(await p.evaluate(CENTRAGE, "form")));
  console.log("  centrage :", JSON.stringify(await p.evaluate(CENTRAGE, "main, .content, #main")));
}

// ------------------------------------------------------------- menu mobile
await etat("menu-mobile-ouvert", `https://${PUB}/`, 375, async () => {
  await p.locator("#sdcd-btn-menu-mobile").click().catch(() => {});
});
console.log("  empilement :", JSON.stringify(await p.evaluate(EMPILEMENT, "#sdcd-nav-mobile .sdcd-nav__liste")));

// --------------------------------------------------- en-tete a la charniere
for (const l of [1024, 900, 820, 768, 640]) {
  await etat("en-tete", `https://${PUB}/`, l);
}

// ------------------------------------------------------------- back-office
await etat("back-office-connexion", `https://${ADM}/cms-admin/login/`, 1440);

await b.close();
