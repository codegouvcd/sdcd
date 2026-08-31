/* Mesure la mise en page : largeurs de conteneur, alignements, mesure de ligne. */
import { chromium } from "playwright";

const BRAVE = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";
const HOTE = "sdcd-72-60-188-156.sslip.io";
const b = await chromium.launch({
  executablePath: BRAVE,
  args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:8443`],
});
const c = await b.newContext({ ignoreHTTPSErrors: true });
const p = await c.newPage();

for (const largeur of [1440, 1280, 768]) {
  await p.setViewportSize({ width: largeur, height: 900 });
  await p.goto(`https://${HOTE}/`, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(400);
  console.log(`\n=== ${largeur} px ===`);
  console.log(
    JSON.stringify(
      await p.evaluate(() => {
        const box = (s) => {
          const e = document.querySelector(s);
          if (!e) return null;
          const r = e.getBoundingClientRect();
          const st = getComputedStyle(e);
          return {
            x: Math.round(r.left),
            l: Math.round(r.width),
            h: Math.round(r.height),
            maxW: st.maxWidth,
            pad: st.paddingLeft + "/" + st.paddingRight,
          };
        };
        const h1 = document.querySelector("h1");
        const par = [...document.querySelectorAll("main p")].filter((e) => e.textContent.trim())[0];
        const car = (e) => {
          if (!e) return null;
          const s = getComputedStyle(e);
          // Mesure de ligne approchee : largeur / largeur moyenne d'un caractere.
          const cv = document.createElement("canvas").getContext("2d");
          cv.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
          const moy = cv.measureText("abcdefghijklmnopqrstuvwxyz ").width / 27;
          return Math.round(e.getBoundingClientRect().width / moy);
        };
        return {
          entete_corps: box(".sdcd-header__corps"),
          entete_nav: box(".sdcd-header__nav"),
          h1: h1 ? { x: Math.round(h1.getBoundingClientRect().left), l: Math.round(h1.getBoundingClientRect().width) } : null,
          premier_p: par ? { x: Math.round(par.getBoundingClientRect().left), l: Math.round(par.getBoundingClientRect().width) } : null,
          mesure_ligne_caracteres: car(par),
          conteneurs_main: [...document.querySelectorAll("main .sdcd-conteneur")].map((e) => {
            const r = e.getBoundingClientRect();
            return { x: Math.round(r.left), l: Math.round(r.width) };
          }),
          pied_haut: box(".sdcd-footer__haut"),
          pied_colonnes: box(".sdcd-footer__colonnes"),
          pied_description: box(".sdcd-footer__description"),
          pied_bande: box(".sdcd-footer__bande-corps"),
          titre_service_souligne: (() => {
            const e = document.querySelector(".sdcd-header__service");
            const a = e?.closest("a");
            return a ? getComputedStyle(a).textDecorationLine : "(absent)";
          })(),
        };
      }),
      null,
      1
    )
  );
}
await b.close();
