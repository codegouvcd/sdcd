import { chromium } from "playwright";
const HOTE = "sdcd-72-60-188-156.sslip.io";
const n = await chromium.launch({ args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:8443`] });
const c = await n.newContext({ ignoreHTTPSErrors: true });
const p = await c.newPage();
await p.goto(`https://${HOTE}/contact/`, { waitUntil: "networkidle" });
console.log("champs :", await p.evaluate(() =>
  [...document.querySelectorAll("form input, form textarea")].map(e => e.name + ":" + e.type)));
await p.fill("#id_votre_nom_complet", "Essai automatique");
await p.fill("#id_votre_adresse_electronique", "pas-un-courriel");
await p.fill("#id_votre_message", "Message d'essai.");
// Tous les champs requis portent la validation native du navigateur : « email »
// pour l'adresse, « required » pour le titre. Elle bloque l'envoi avant qu'il
// n'atteigne le serveur — c'est le comportement attendu, mais il empeche de
// verifier le rendu des erreurs cote serveur. On la desactive pour ce seul essai.
await p.evaluate(() => { document.querySelector("form").noValidate = true; });
const avant = p.url();
await p.locator('form input[type="submit"]').click();
await p.waitForLoadState("networkidle");
await p.waitForTimeout(1500);
console.log("url avant :", avant, "\nurl apres :", p.url());
console.log(JSON.stringify(await p.evaluate(() => ({
  erreursSdcd: document.querySelectorAll(".sdcd-champ__erreur").length,
  listesBrutes: document.querySelectorAll(".errorlist").length,
  couleur: (() => { const e = document.querySelector(".sdcd-champ__erreur"); return e ? getComputedStyle(e).color : null; })(),
  balise: document.querySelector(".sdcd-champ__erreur")?.tagName || null,
  texte: document.querySelector(".sdcd-champ__erreur")?.textContent.trim().slice(0, 60) || null,
  autofocus: document.querySelector("[autofocus]")?.id || null,
  invalides: document.querySelectorAll("[aria-invalid=true]").length,
  merci: document.body.innerText.slice(0, 120),
})), null, 1));
await p.screenshot({ path: process.env.DOSSIER_CAPTURES + "/contact-erreurs.png", fullPage: true });
await n.close();
