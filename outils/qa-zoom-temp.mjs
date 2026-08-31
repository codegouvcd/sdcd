import { chromium } from "playwright";
const HOTE = "sdcd-72-60-188-156.sslip.io";
const n = await chromium.launch({ args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:8443`] });
const c = await n.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1280, height: 950 } });
await c.addCookies([{ name: "sessionid", value: process.env.SESSION_CMS, domain: HOTE, path: "/", httpOnly: true, secure: true }]);
const p = await c.newPage();
await p.goto(`https://${HOTE}/cms-admin/pages/16/view_draft/`, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1200);
const cartes = p.locator(".sdcd-card");
console.log("cartes :", await cartes.count());
for (const i of [2, 3, 6]) {
  const el = cartes.nth(i);
  if (!(await el.count())) continue;
  await el.screenshot({ path: `${process.env.DOSSIER_CAPTURES}/carte-${i}.png` }).catch((e) => console.log("capture", i, e.message.slice(0, 60)));
  console.log(i, JSON.stringify(await el.evaluate((c) => {
    const desc = (e) => e ? { t: e.tagName, cl: e.className.slice(0, 46), r: (() => { const b = e.getBoundingClientRect(); return `${Math.round(b.width)}x${Math.round(b.height)}`; })(), d: getComputedStyle(e).display } : null;
    return { carte: desc(c), enfants: [...c.children].map(desc) };
  })));
}
await n.close();
