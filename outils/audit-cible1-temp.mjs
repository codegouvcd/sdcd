import { chromium } from "playwright";
const A = "admin-72-60-188-156.sslip.io";
const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: [`--host-resolver-rules=MAP ${A} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 950 } });
const p = await c.newPage();
await p.goto(`https://${A}/cms-admin/login/`, { waitUntil: "networkidle", timeout: 60000 });
console.log(JSON.stringify(await p.evaluate(() =>
  [...document.querySelectorAll("a[href]")]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.height > 0 && (r.width < 24 || r.height < 24); })
    .map((e) => ({ texte: (e.textContent || "").trim().slice(0, 30), h: Math.round(e.getBoundingClientRect().height),
                   classe: e.className || "(aucune)", parent: e.parentElement.tagName + "." + (e.parentElement.className || "").toString().slice(0, 30) }))
), null, 1));
await b.close();
