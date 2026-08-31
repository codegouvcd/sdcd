import { chromium } from "playwright";
const HOTE = "sdcd-72-60-188-156.sslip.io";
const n = await chromium.launch({ args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:8443`] });
const c = await n.newContext({ ignoreHTTPSErrors: true });
await c.addCookies([{ name: "sessionid", value: process.env.SESSION_CMS, domain: HOTE, path: "/", httpOnly: true, secure: true }]);
const p = await c.newPage();
for (const url of ["/", "/cms-admin/pages/17/view_draft/", "/cms-admin/pages/9/view_draft/", "/cms-admin/images/"]) {
  await p.goto(`https://${HOTE}${url}`, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const imgs = [...document.images];
    return {
      images: imgs.length,
      cassees: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      exemples: imgs.filter((i) => i.complete && i.naturalWidth === 0).slice(0, 3).map((i) => i.currentSrc.slice(-70)),
    };
  });
  console.log(url.padEnd(38), JSON.stringify(r));
}
await p.goto(`https://${HOTE}/cms-admin/pages/17/view_draft/`, { waitUntil: "networkidle" }).catch(() => {});
await p.screenshot({ path: process.env.DOSSIER_CAPTURES + "/apercu-etapier.png", fullPage: true });
await p.goto(`https://${HOTE}/cms-admin/pages/16/view_draft/`, { waitUntil: "networkidle" }).catch(() => {});
await p.screenshot({ path: process.env.DOSSIER_CAPTURES + "/apercu-cartes.png", fullPage: true });
await n.close();
