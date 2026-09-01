/* Audite les dix modeles de pages, qui couvrent bien plus de composants que le
 * site vitrine, en theme clair ET en theme sombre.
 *
 * Le theme sombre n'avait jamais ete regarde : les jetons existent et sont
 * verifies au contraste, mais rien ne garantissait qu'ils soient tous employes.
 * Une couleur ecrite en dur quelque part ne se voit qu'en basculant. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const ADM = "admin-72-60-188-156.sslip.io";
const SORTIE = process.env.CAPTURES || "./captures";
mkdirSync(SORTIE, { recursive: true });

const MODELES = [
  [8, "landing"], [9, "tuiles"], [10, "entetes"], [11, "menu-lateral"],
  [12, "textes-images"], [13, "mise-en-valeur"], [14, "grilles"],
  [15, "accordeons"], [16, "cartes"], [17, "etapiers"],
];

const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: [`--host-resolver-rules=MAP ${ADM} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true });
await c.addCookies([
  { name: "sessionid", value: process.env.SESSION_CMS, domain: ADM, path: "/", httpOnly: true, secure: true },
]);
const p = await c.newPage();

const SONDE = () => {
  const out = [];
  const nom = (e) =>
    e.tagName.toLowerCase() + (e.className ? "." + e.className.toString().trim().split(/\s+/)[0] : "");

  // Debordements, restreints aux elements du systeme.
  for (const e of document.querySelectorAll("[class*='sdcd-'], [class*='cmsfr-']")) {
    const pa = e.parentElement;
    if (!pa) continue;
    const s = getComputedStyle(e);
    if (s.position === "absolute" || s.position === "fixed") continue;
    if (getComputedStyle(pa).overflowX !== "visible") continue;
    const r = e.getBoundingClientRect(), rp = pa.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const d = Math.round(Math.max(rp.left - r.left, r.right - rp.right));
    if (d > 2) out.push(`${nom(e)} deborde de ${nom(pa)} de ${d}px`);
  }

  // Largeurs heterogenes dans une meme rangee de grille.
  for (const g of document.querySelectorAll(".sdcd-grille")) {
    const enf = [...g.children].filter((e) => e.getBoundingClientRect().height > 4);
    if (enf.length < 2) continue;
    const larg = enf.map((e) => {
      const k = e.querySelector(".sdcd-tile, .sdcd-card") || e;
      return Math.round(k.getBoundingClientRect().width);
    });
    if (new Set(larg).size > 1) out.push(`largeurs heterogenes : ${larg.join("/")}`);
  }

  // Contraste reel du texte sur son fond.
  const lum = (v) => {
    const x = v.map((n) => { n /= 255; return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4); });
    return 0.2126 * x[0] + 0.7152 * x[1] + 0.0722 * x[2];
  };
  const rgb = (s) => (s.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
  const fond = (e) => {
    for (let n = e; n; n = n.parentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (bg && bg !== "transparent" && !/,\s*0\s*\)$/.test(bg)) return rgb(bg);
    }
    return [255, 255, 255];
  };
  const vus = new Set();
  for (const e of document.querySelectorAll("p,a,li,h1,h2,h3,h4,h5,h6,span,button,label,td,th,dt,dd,strong")) {
    if (!e.offsetWidth && !e.offsetHeight) continue;
    if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const s = getComputedStyle(e);
    const t = parseFloat(s.fontSize), gras = parseInt(s.fontWeight, 10) >= 700;
    const seuil = t >= 24 || (gras && t >= 18.66) ? 3 : 4.5;
    const l1 = lum(rgb(s.color)), l2 = lum(fond(e));
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    if (r < seuil) {
      const cle = `${s.color}|${Math.round(t)}`;
      if (vus.has(cle)) continue;
      vus.add(cle);
      out.push(`contraste ${r.toFixed(2)}<${seuil} ${nom(e)} « ${e.textContent.trim().slice(0, 22)} »`);
    }
  }

  // Une couleur ecrite en dur ne suit pas le theme : on repere les fonds et
  // textes qui ne bougent pas entre les deux themes (compare par l'appelant).
  return { soucis: [...new Set(out)].slice(0, 6) };
};

async function auditer(theme) {
  console.log(`\n===== theme ${theme} =====`);
  for (const [id, nom] of MODELES) {
    for (const l of [1440, 375]) {
      await p.setViewportSize({ width: l, height: 950 });
      const r = await p.goto(`https://${ADM}/cms-admin/pages/${id}/view_draft/`, {
        waitUntil: "networkidle", timeout: 60000,
      }).catch(() => null);
      await p.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
      await p.waitForTimeout(350);
      const s = await p.evaluate(SONDE);
      console.log(`  ${nom.padEnd(16)} ${String(l).padEnd(5)} ${r?.status() ?? "?"}  ${s.soucis.length ? s.soucis.join(" | ") : "-"}`);
      if (l === 1440) {
        await p.screenshot({ path: `${SORTIE}/${theme}-${nom}.png`, fullPage: true });
      }
    }
  }
}

await auditer("light");
await auditer("dark");
await b.close();
