import { chromium } from "playwright";
const H = "sdcd-72-60-188-156.sslip.io";
const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: [`--host-resolver-rules=MAP ${H} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 950 } });
const p = await c.newPage();
for (const u of ["/", "/plan-du-site/"]) {
  await p.goto(`https://${H}${u}`, { waitUntil: "networkidle", timeout: 60000 });
  console.log("\n=== " + u);
  console.log(JSON.stringify(await p.evaluate(() => {
    const enLigne = (e) => {
      const pa = e.parentElement;
      return pa && ["P", "LI", "SPAN", "TD", "DD"].includes(pa.tagName) &&
        pa.textContent.trim().length > (e.textContent || "").trim().length + 4;
    };
    return [...document.querySelectorAll("a[href]")]
      .filter((e) => (e.offsetWidth || e.offsetHeight) && !enLigne(e) && e.tabIndex >= 0)
      .map((e) => ({ ...e.getBoundingClientRect().toJSON(), e }))
      .filter((o) => o.width < 24 || o.height < 24)
      .map((o) => ({
        texte: (o.e.textContent || "").trim().slice(0, 26),
        h: Math.round(o.height),
        classe: o.e.className || "(aucune)",
        parent: o.e.parentElement.tagName + "." + (o.e.parentElement.className || "").toString().slice(0, 28),
        // La zone reellement cliquable peut etre etendue par un ancetre cliquable.
        etendue: !!o.e.closest(".sdcd-cliquable, .sdcd-tile, .sdcd-card"),
      }));
  }), null, 1));
}
await b.close();
