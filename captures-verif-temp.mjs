/* Verification apres deploiement : mega-menu (bureau, large, mobile), etapier,
 * index des composants et une page de composant. Temporaire. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const H = "sdcd-72-60-188-156.sslip.io", S = process.env.CAPTURES; mkdirSync(S, { recursive: true });
const b = await chromium.launch({ executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", args: [`--host-resolver-rules=MAP ${H} 127.0.0.1:8443`] });
const mesures = () => ({
  debord: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  none: document.querySelectorAll('a[href="None"]').length,
  diese: [...document.querySelectorAll('header a[href="#"]')].length,
  h1: document.querySelectorAll("h1").length,
});
for (const [nom, w, h] of [["1440", 1440, 900], ["1280", 1280, 900], ["mobile", 375, 812]]) {
  const c = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: w, height: h } });
  const p = await c.newPage();
  const journal = [];
  p.on("console", (m) => { if (m.type() === "error") journal.push(m.text().slice(0, 120)); });
  p.on("response", (r) => { if (r.status() >= 400) journal.push(r.status() + " " + r.url().slice(0, 100)); });
  await p.goto(`https://${H}/?v=${Date.now()}`, { waitUntil: "networkidle" });
  console.log(nom, "accueil", JSON.stringify(await p.evaluate(mesures)));
  if (nom === "mobile") {
    await p.click("#sdcd-btn-menu-mobile"); await p.waitForTimeout(300);
    const btn = p.locator(".sdcd-header__nav--mobile button[aria-controls]").first();
    await btn.click(); await p.waitForTimeout(400);
    await p.screenshot({ path: `${S}/v-megamenu-${nom}.png` });
    await p.mouse.wheel(0, 500); await p.waitForTimeout(300);
    await p.screenshot({ path: `${S}/v-megamenu-${nom}-2.png` });
  } else {
    await p.locator(".sdcd-header__nav button[aria-expanded]").first().click(); await p.waitForTimeout(400);
    await p.screenshot({ path: `${S}/v-megamenu-${nom}.png` });
    await p.keyboard.press("Escape"); await p.waitForTimeout(200);
    const ouvert = await p.locator(".sdcd-megamenu:not([hidden])").count();
    await p.locator(".sdcd-header__nav button[aria-expanded]").first().click(); await p.waitForTimeout(300);
    await p.locator(".sdcd-megamenu .sdcd-lien--fermer").first().click(); await p.waitForTimeout(300);
    console.log(nom, "megamenu apres Echap :", ouvert, "ouvert(s) ; apres Fermer :", await p.locator(".sdcd-megamenu:not([hidden])").count());
  }
  for (const [slug, chemin] of [["composants", "/exemples/composants/"], ["etapiers", "/exemples/composants/etapiers/"], ["menu-lateral", "/exemples/composants/page-de-contenu-avec-menu-lateral/"], ["acte", "/exemples/catalogue-de-services/acte-de-naissance/"]]) {
    const r = await p.goto(`https://${H}${chemin}?v=${Date.now()}`, { waitUntil: "networkidle" }).catch(() => null);
    console.log(nom, slug, r ? r.status() : "?", JSON.stringify(await p.evaluate(mesures)));
    if (slug === "composants") await p.screenshot({ path: `${S}/v-${slug}-${nom}.png`, fullPage: nom !== "mobile" });
    const st = p.locator(".sdcd-stepper").first();
    if (await st.count()) { await st.scrollIntoViewIfNeeded(); await st.screenshot({ path: `${S}/v-stepper-${slug}-${nom}.png` }); }
    if (slug === "menu-lateral") await p.screenshot({ path: `${S}/v-${slug}-${nom}.png` });
  }
  console.log(nom, "journal :", journal.length ? [...new Set(journal)].slice(0, 5).join(" ; ") : "rien");
  await c.close();
}
await b.close();
