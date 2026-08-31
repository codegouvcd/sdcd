/* Affiche l'arbre du <main> et du pied, avec geometrie : ou naissent les
 * decalages et les espaces vides. */
import { chromium } from "playwright";

const b = await chromium.launch({
  executablePath: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  args: ["--host-resolver-rules=MAP sdcd-72-60-188-156.sslip.io 127.0.0.1:8443"],
});
const c = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
await p.goto("https://sdcd-72-60-188-156.sslip.io/", { waitUntil: "networkidle", timeout: 60000 });

console.log(
  await p.evaluate(() => {
    const lignes = [];
    const parcourir = (e, prof) => {
      if (prof > 5) return;
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      lignes.push(
        "  ".repeat(prof) +
          e.tagName.toLowerCase() +
          (e.className ? "." + e.className.toString().trim().replace(/\s+/g, ".").slice(0, 46) : "") +
          `   x=${Math.round(r.left)} l=${Math.round(r.width)} h=${Math.round(r.height)}` +
          `  pad=${s.paddingLeft}|${s.paddingRight}  maxW=${s.maxWidth}`
      );
      for (const enf of e.children) parcourir(enf, prof + 1);
    };
    parcourir(document.querySelector("main"), 0);
    lignes.push("");
    parcourir(document.querySelector("footer"), 0);
    return lignes.join("\n");
  })
);
await b.close();
