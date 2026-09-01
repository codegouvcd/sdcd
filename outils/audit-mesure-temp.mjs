import { chromium } from "playwright";
const A = "admin-72-60-188-156.sslip.io";
const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: [`--host-resolver-rules=MAP ${A} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 950 } });
await c.addCookies([{ name: "sessionid", value: process.env.SESSION_CMS, domain: A, path: "/", httpOnly: true, secure: true }]);
const p = await c.newPage();
for (const [id, nom] of [[13, "mise-en-valeur"], [16, "cartes"], [12, "textes-images"]]) {
  await p.goto(`https://${A}/cms-admin/pages/${id}/view_draft/`, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(400);
  console.log("\n=== " + nom);
  console.log(JSON.stringify(await p.evaluate(() => {
    const cv = document.createElement("canvas").getContext("2d");
    const car = (e) => {
      const s = getComputedStyle(e);
      cv.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const moy = cv.measureText("abcdefghijklmnopqrstuvwxyz ").width / 27;
      return Math.round(e.getBoundingClientRect().width / moy);
    };
    const out = [];
    for (const sel of [".sdcd-alert p", ".sdcd-highlight p", ".sdcd-exergue__texte", ".sdcd-quote p, .sdcd-quote blockquote", ".sdcd-card__description", ".sdcd-media p"]) {
      for (const e of [...document.querySelectorAll(sel)].slice(0, 1)) {
        if ((e.textContent || "").trim().length < 80) continue;
        out.push({ sel, caracteres: car(e), largeur: Math.round(e.getBoundingClientRect().width) });
      }
    }
    return out;
  }), null, 1));
}
await b.close();
