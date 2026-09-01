/* Planche de captures : toutes les pages, toutes les largeurs charnieres, et
 * les etats interactifs. Mesure au passage ce qu'une sonde peut mesurer, mais
 * son but est de produire des images a REGARDER : la plupart des defauts de
 * mise en page ne se detectent pas autrement. */
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
if (process.env.SESSION_CMS) {
  await c.addCookies([
    { name: "sessionid", value: process.env.SESSION_CMS, domain: ADM, path: "/", httpOnly: true, secure: true },
  ]);
}
const p = await c.newPage();

/* Ce qu'une sonde peut voir : listes de navigation eclatees en colonnes,
 * elements qui debordent de leur parent, texte trop long, cibles trop petites. */
const SONDE = () => {
  const out = [];
  const nom = (e) =>
    e.tagName.toLowerCase() + (e.className ? "." + e.className.toString().trim().split(/\s+/)[0] : "");

  // Une liste dont les items sont sur plusieurs colonnes alors qu'elle est
  // marquee comme empilee (nav mobile, liste de liens du pied).
  for (const sel of ["#sdcd-nav-mobile .sdcd-nav__liste", ".sdcd-sidemenu__liens", ".sdcd-liens"]) {
    const l = document.querySelector(sel);
    if (!l) continue;
    const items = [...l.children].filter((e) => e.getBoundingClientRect().height > 0);
    const gauches = new Set(items.map((e) => Math.round(e.getBoundingClientRect().left)));
    if (items.length > 1 && gauches.size > 1) out.push(`${sel} eclatee en ${gauches.size} colonnes`);
  }

  // Un enfant qui deborde horizontalement de son parent. Restreint aux elements
  // du systeme : le back-office est habille par Wagtail, dont les debordements
  // ne relevent pas de nous et noyaient les vrais signalements.
  for (const e of document.querySelectorAll("[class*='sdcd-'], [class*='cmsfr-']")) {
    const pa = e.parentElement;
    if (!pa) continue;
    const s = getComputedStyle(e);
    if (s.position === "absolute" || s.position === "fixed") continue;
    if (getComputedStyle(pa).overflowX !== "visible") continue;
    const r = e.getBoundingClientRect();
    const rp = pa.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const debord = Math.round(Math.max(rp.left - r.left, r.right - rp.right));
    if (debord > 2) out.push(`${nom(e)} deborde de ${nom(pa)} de ${debord}px`);
  }

  // Mesure de ligne du texte courant.
  const par = [...document.querySelectorAll("main p")].filter((e) => e.textContent.trim().length > 120)[0];
  if (par) {
    const s = getComputedStyle(par);
    const cv = document.createElement("canvas").getContext("2d");
    cv.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    const moy = cv.measureText("abcdefghijklmnopqrstuvwxyz ").width / 27;
    const car = Math.round(par.getBoundingClientRect().width / moy);
    if (car > 90) out.push(`mesure de ligne : ${car} caracteres`);
  }

  // Cibles trop petites, hors liens en ligne dans un texte.
  const enLigne = (e) => {
    const pa = e.parentElement;
    return pa && ["P", "LI", "SPAN", "TD", "DD"].includes(pa.tagName) &&
      pa.textContent.trim().length > (e.textContent || "").trim().length + 4;
  };
  for (const e of document.querySelectorAll("a[href],button,input,select,summary")) {
    if (!(e.offsetWidth || e.offsetHeight) || enLigne(e)) continue;
    // Un element masque aux technologies d'assistance n'est pas une cible :
    // c'est le cas du pot de miel anti-robot, de 1x1 px et hors tabulation.
    if (e.closest("[aria-hidden=true]") || e.getAttribute("aria-hidden") === "true") continue;
    if (e.tabIndex < 0) continue;
    // La zone cliquable peut etre etendue par un ancetre : une tuile ou une
    // carte entierement cliquable est la vraie cible, pas son titre.
    if (e.closest(".sdcd-cliquable, .sdcd-tile, .sdcd-card")) continue;
    // Le back-office est habille par Wagtail : hors du perimetre du systeme.
    if (/^(w-|Draftail-|c-sf-|avatar__)/.test(e.className || "")) continue;
    const r = e.getBoundingClientRect();
    if (r.width < 24 || r.height < 24) out.push(`cible ${nom(e)} ${Math.round(r.width)}x${Math.round(r.height)}`);
  }

  return [...new Set(out)].slice(0, 8);
};

async function planche(nom, url, largeurs, avant) {
  for (const l of largeurs) {
    await p.setViewportSize({ width: l, height: 950 });
    const r = await p.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => null);
    await p.waitForTimeout(500);
    if (avant) await avant();
    await p.waitForTimeout(400);
    const s = await p.evaluate(SONDE);
    console.log(`${nom.padEnd(24)} ${String(l).padEnd(5)} ${r?.status() ?? "?"}  ${s.length ? s.join(" | ") : "-"}`);
    await p.screenshot({
      path: `${SORTIE}/${nom.replace(/[^a-z0-9]+/gi, "-")}-${l}.png`,
      fullPage: l <= 420,
    });
  }
}

const LARGEURS = [1440, 1024, 768, 375];
console.log("page                     larg  code  observations");
console.log("-".repeat(78));
for (const [nom, chemin] of [
  ["accueil", "/"],
  ["creer-votre-site", "/creer-votre-site/"],
  ["systeme-de-design", "/systeme-de-design/"],
  ["questions-frequentes", "/questions-frequentes/"],
  ["contact", "/contact/"],
  ["plan-du-site", "/plan-du-site/"],
  ["mentions-legales", "/mentions-legales/"],
]) {
  await planche(nom, `https://${PUB}${chemin}`, LARGEURS);
}
await planche("connexion", `https://${ADM}/cms-admin/login/`, [1440, 375]);
if (process.env.SESSION_CMS) {
  await planche("bo-accueil", `https://${ADM}/cms-admin/`, [1440, 768]);
  await planche("bo-pages", `https://${ADM}/cms-admin/pages/`, [1440]);
  await planche("bo-edition", `https://${ADM}/cms-admin/pages/16/edit/`, [1440]);
}
await b.close();
