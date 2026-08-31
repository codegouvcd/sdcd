import { chromium } from "playwright";
const HOTE = "sdcd-72-60-188-156.sslip.io";
const n = await chromium.launch({ args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:8443`] });
const c = await n.newContext({ ignoreHTTPSErrors: true });
await c.addCookies([{ name: "sessionid", value: process.env.SESSION_CMS, domain: HOTE, path: "/", httpOnly: true, secure: true }]);
const p = await c.newPage();
await p.goto(`https://${HOTE}/cms-admin/pages/16/view_draft/`, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1200);

console.log("--- images qui debordent de leur carte ---");
console.log(JSON.stringify(await p.evaluate(() => {
  const out = [];
  document.querySelectorAll(".sdcd-card").forEach((carte, i) => {
    const rc = carte.getBoundingClientRect();
    carte.querySelectorAll("img").forEach((img) => {
      const ri = img.getBoundingClientRect();
      const debord = Math.round(Math.max(rc.left - ri.left, ri.right - rc.right));
      if (debord > 1) out.push({ carte: i, debordPx: debord, largeurImg: Math.round(ri.width), largeurCarte: Math.round(rc.width), objectFit: getComputedStyle(img).objectFit, maxW: getComputedStyle(img).maxWidth });
    });
  });
  return out.slice(0, 5);
}), null, 1));

console.log("--- sur-titre de carte ---");
console.log(JSON.stringify(await p.evaluate(() => {
  const e = document.querySelector(".sdcd-card__sur-titre");
  if (!e) return "absent";
  const s = getComputedStyle(e);
  return { police: s.fontFamily.slice(0, 60), taille: s.fontSize, couleur: s.color, texte: e.textContent.trim().slice(0, 40) };
}), null, 1));

console.log("--- badges ---");
console.log(JSON.stringify(await p.evaluate(() =>
  [...document.querySelectorAll(".sdcd-badge")].slice(0, 4).map((b) => {
    const s = getComputedStyle(b);
    const r = b.getBoundingClientRect();
    return { classe: b.className, affichage: s.display, largeur: Math.round(r.width), hauteur: Math.round(r.height), parent: b.parentElement.className.slice(0, 40) };
  })
), null, 1));

console.log("--- etiquettes ---");
console.log(JSON.stringify(await p.evaluate(() =>
  [...document.querySelectorAll(".sdcd-tag")].slice(0, 3).map((t) => {
    const s = getComputedStyle(t);
    return { classe: t.className, fond: s.backgroundColor, bordure: s.borderColor, couleur: s.color };
  })
), null, 1));
await n.close();
