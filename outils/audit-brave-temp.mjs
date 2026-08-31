/* Audit du site deploye, pilote sous Brave.
 *
 * Le poste ne joint pas le serveur de revocation des certificats : tout client
 * TLS de Windows refuse alors la connexion, alors que la chaine est valide.
 * On passe donc par un tunnel SSH, et le navigateur resout le nom vers le port
 * local. Le serveur, le rendu et le certificat sont ceux de production.
 *
 * Le script mesure et affiche. Il ne conclut pas : c'est moi qui juge.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BRAVE =
  process.env.BRAVE ||
  "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";
const HOTE = process.env.HOTE || "sdcd-72-60-188-156.sslip.io";
const PORT = process.env.PORT_TUNNEL || "8443";
const SORTIE = process.env.CAPTURES || "./captures";
const SESSION = process.env.SESSION_CMS;
const PAGES = (process.env.PAGES || "/,/contact/,/mentions-legales/,/accessibilite/,/plan-du-site/")
  .split(",")
  .filter(Boolean);

mkdirSync(SORTIE, { recursive: true });

const navigateur = await chromium.launch({
  executablePath: BRAVE,
  args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:${PORT}`],
});
const contexte = await navigateur.newContext({ ignoreHTTPSErrors: true });
if (SESSION) {
  await contexte.addCookies([
    { name: "sessionid", value: SESSION, domain: HOTE, path: "/", httpOnly: true, secure: true },
  ]);
}

const titre = (t) => console.log("\n" + t + "\n" + "=".repeat(t.length));
const sous = (t) => console.log("\n-- " + t);

const page = await contexte.newPage();
const journal = { console: [], reseau: [] };
page.on("console", (m) => {
  if (m.type() === "error") journal.console.push(m.text().slice(0, 200));
});
page.on("requestfailed", (r) =>
  journal.reseau.push("ECHEC " + r.url().slice(0, 110) + " " + (r.failure()?.errorText || ""))
);
page.on("response", (r) => {
  if (r.status() >= 400) journal.reseau.push(r.status() + " " + r.url().slice(0, 110));
});

/* Les mesures d'accessibilite et de structure, faites dans la page. */
const SONDE = () => {
  const txt = (e) => (e.textContent || "").trim();
  const nomAccessible = (e) =>
    (e.getAttribute("aria-label") || "").trim() ||
    txt(e) ||
    (e.querySelector("img") ? e.querySelector("img").getAttribute("alt") || "" : "") ||
    (e.getAttribute("title") || "").trim();

  const titres = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    n: +h.tagName[1],
    t: txt(h).slice(0, 50),
  }));
  const sauts = [];
  for (let i = 1; i < titres.length; i++) {
    if (titres[i].n - titres[i - 1].n > 1) {
      sauts.push(`h${titres[i - 1].n} -> h${titres[i].n} : « ${titres[i].t} »`);
    }
  }

  const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
  const idsEnDouble = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];

  // Cibles tactiles : le critere 2.5.8 exempte les liens en ligne dans un texte.
  const enLigne = (e) => {
    const p = e.parentElement;
    if (!p) return false;
    return ["P", "LI", "SPAN", "TD", "DD", "DT"].includes(p.tagName) && p.textContent.trim().length > txt(e).length + 4;
  };
  const petitesCibles = [...document.querySelectorAll("a[href],button,input,select,textarea,summary")]
    .filter((e) => e.offsetWidth || e.offsetHeight)
    .filter((e) => !enLigne(e))
    .map((e) => ({ e, r: e.getBoundingClientRect() }))
    .filter(({ r }) => r.width < 24 || r.height < 24)
    .map(({ e, r }) => `${e.tagName}.${(e.className || "").toString().slice(0, 28)} ${Math.round(r.width)}x${Math.round(r.height)}`);

  return {
    langue: document.documentElement.lang || "(absente)",
    titrePage: document.title,
    h1: document.querySelectorAll("h1").length,
    sautsDeNiveau: sauts,
    idsEnDouble,
    imagesSansAlt: [...document.images]
      .filter((i) => !i.hasAttribute("alt"))
      .map((i) => (i.getAttribute("src") || "").slice(-60)),
    imagesCassees: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute("src")).length,
    liensSansNom: [...document.querySelectorAll("a[href]")]
      .filter((a) => !nomAccessible(a))
      .map((a) => a.getAttribute("href").slice(0, 60)),
    boutonsSansNom: [...document.querySelectorAll("button")]
      .filter((b) => !nomAccessible(b))
      .map((b) => (b.className || "").toString().slice(0, 40)),
    champsSansEtiquette: [...document.querySelectorAll("input:not([type=hidden]):not([type=submit]),select,textarea")]
      .filter((c) => {
        if (c.getAttribute("aria-label") || c.getAttribute("aria-labelledby")) return false;
        return !(c.id && document.querySelector(`label[for="${CSS.escape(c.id)}"]`));
      })
      .map((c) => c.name || c.id || c.tagName),
    reperes: {
      banner: document.querySelectorAll("[role=banner],header").length,
      main: document.querySelectorAll("[role=main],main").length,
      contentinfo: document.querySelectorAll("[role=contentinfo],footer").length,
      nav: document.querySelectorAll("nav").length,
    },
    liensEvitement: document.querySelectorAll(".sdcd-skiplink").length,
    debordement: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    largeurDoc: document.documentElement.scrollWidth,
    // Liens ouvrant un nouvel onglet sans le dire.
    nouvelOngletSansMention: [...document.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !/nouvelle fen|nouvel onglet|new window|new tab/i.test(nomAccessible(a) + (a.getAttribute("title") || "")))
      .map((a) => nomAccessible(a).slice(0, 40)),
  };
};

/* Contraste reel : couleur calculee du texte sur le premier fond opaque au-dessus. */
const CONTRASTE = () => {
  const lum = (c) => {
    const v = c.map((x) => {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const rgb = (s) => (s.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
  const opaque = (s) => s && !/rgba\(.*,\s*0\s*\)/.test(s) && s !== "transparent";
  const fond = (e) => {
    let n = e;
    while (n) {
      const b = getComputedStyle(n).backgroundColor;
      if (opaque(b)) return rgb(b);
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const echecs = [];
  const vus = new Set();
  for (const e of document.querySelectorAll("p,a,li,h1,h2,h3,h4,h5,h6,span,button,label,td,th,dt,dd,strong,em")) {
    if (!e.offsetWidth && !e.offsetHeight) continue;
    const propre = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!propre) continue;
    const s = getComputedStyle(e);
    const taille = parseFloat(s.fontSize);
    const gras = parseInt(s.fontWeight, 10) >= 700;
    const seuil = taille >= 24 || (gras && taille >= 18.66) ? 3 : 4.5;
    const r = ratio(rgb(s.color), fond(e));
    if (r < seuil) {
      const cle = `${e.tagName}|${s.color}|${Math.round(taille)}`;
      if (vus.has(cle)) continue;
      vus.add(cle);
      echecs.push({
        el: e.tagName + "." + (e.className || "").toString().slice(0, 26),
        texte: e.textContent.trim().slice(0, 34),
        ratio: +r.toFixed(2),
        seuil,
        couleur: s.color,
      });
    }
  }
  return echecs.slice(0, 12);
};

for (const largeur of [1280, 375]) {
  titre(`Largeur ${largeur} px`);
  for (const url of PAGES) {
    await page.setViewportSize({ width: largeur, height: 900 });
    const debut = Date.now();
    const rep = await page.goto(`https://${HOTE}${url}`, { waitUntil: "networkidle", timeout: 60000 }).catch(() => null);
    const duree = Date.now() - debut;
    await page.waitForTimeout(500);
    const s = await page.evaluate(SONDE);
    const c = await page.evaluate(CONTRASTE);

    const soucis = [];
    if (s.h1 !== 1) soucis.push(`h1 = ${s.h1}`);
    if (s.sautsDeNiveau.length) soucis.push(`sauts de titre : ${s.sautsDeNiveau.join(" ; ")}`);
    if (s.idsEnDouble.length) soucis.push(`ids en double : ${s.idsEnDouble.join(", ")}`);
    if (s.imagesSansAlt.length) soucis.push(`images sans alt : ${s.imagesSansAlt.join(", ")}`);
    if (s.imagesCassees) soucis.push(`images cassees : ${s.imagesCassees}`);
    if (s.liensSansNom.length) soucis.push(`liens sans nom : ${s.liensSansNom.join(", ")}`);
    if (s.boutonsSansNom.length) soucis.push(`boutons sans nom : ${s.boutonsSansNom.join(", ")}`);
    if (s.champsSansEtiquette.length) soucis.push(`champs sans etiquette : ${s.champsSansEtiquette.join(", ")}`);
    if (s.debordement > 0) soucis.push(`debordement ${s.debordement}px (doc ${s.largeurDoc})`);
    if (s.reperes.main !== 1) soucis.push(`repere main = ${s.reperes.main}`);
    if (s.nouvelOngletSansMention.length) soucis.push(`nouvel onglet sans mention : ${s.nouvelOngletSansMention.join(", ")}`);
    if (c.length) soucis.push(`contraste insuffisant : ${c.length} cas`);

    console.log(`\n  ${url}  ${rep?.status() ?? "?"}  ${duree}ms  lang=${s.langue}`);
    if (soucis.length) soucis.forEach((x) => console.log("     ! " + x));
    else console.log("     rien a signaler sur les criteres mesures");
    c.forEach((x) =>
      console.log(`       contraste ${x.ratio} < ${x.seuil}  ${x.el}  « ${x.texte} »  ${x.couleur}`)
    );

    if (largeur === 375 || url === "/") {
      const nom = (url === "/" ? "accueil" : url.replace(/\//g, "-").replace(/^-|-$/g, "")) + "-" + largeur;
      await page.screenshot({ path: `${SORTIE}/${nom}.png`, fullPage: true });
    }
  }
}

sous("Indicateur de focus au clavier (Tab reel, pas .focus())");
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(`https://${HOTE}/`, { waitUntil: "networkidle" });
const focus = [];
for (let i = 0; i < 8; i++) {
  await page.keyboard.press("Tab");
  focus.push(
    await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const s = getComputedStyle(e);
      return {
        el: e.tagName + "." + (e.className || "").toString().slice(0, 26),
        outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0,
        ombre: s.boxShadow !== "none",
      };
    })
  );
}
const sansIndicateur = focus.filter((f) => f && !f.outline && !f.ombre);
console.log(
  "   " +
    (sansIndicateur.length
      ? sansIndicateur.map((f) => "SANS INDICATEUR " + f.el).join("\n   ")
      : `${focus.filter(Boolean).length} elements parcourus, tous avec indicateur visible`)
);

sous("Console et reseau");
console.log("   erreurs console :", journal.console.length ? journal.console.slice(0, 6) : "aucune");
console.log("   requetes en echec :", journal.reseau.length ? [...new Set(journal.reseau)].slice(0, 8) : "aucune");

await navigateur.close();
