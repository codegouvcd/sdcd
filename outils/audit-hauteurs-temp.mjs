import { chromium } from "playwright";
const H = "sdcd-72-60-188-156.sslip.io";
const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: [`--host-resolver-rules=MAP ${H} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 950 } });
const p = await c.newPage();
for (const u of ["/", "/systeme-de-design/"]) {
  await p.goto(`https://${H}${u}`, { waitUntil: "networkidle", timeout: 60000 });
  console.log("\n=== " + u);
  console.log(JSON.stringify(await p.evaluate(() => {
    const res = [];
    for (const g of document.querySelectorAll(".sdcd-grille")) {
      const lignes = {};
      for (const enf of g.children) {
        const r = enf.getBoundingClientRect();
        if (r.height < 4) continue;
        const cle = Math.round(r.top);
        (lignes[cle] ||= []).push(enf);
      }
      for (const [top, items] of Object.entries(lignes)) {
        if (items.length < 2) continue;
        const cols = items.map((e) => Math.round(e.getBoundingClientRect().height));
        const cartes = items.map((e) => {
          const k = e.querySelector(".sdcd-card, .sdcd-tile");
          return k ? Math.round(k.getBoundingClientRect().height) : null;
        });
        if (new Set(cartes.filter(Boolean)).size > 1) {
          res.push({ ligne: +top, colonnes: cols, contenus: cartes, classe: g.className.slice(0, 46) });
        }
      }
    }
    return res;
  }), null, 1));
}
await b.close();
