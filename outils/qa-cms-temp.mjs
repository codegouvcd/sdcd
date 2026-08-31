/* Controle visuel du CMS deploye, cote public et cote redaction.
 *
 * Le poste ne joint pas le serveur de revocation des certificats : schannel
 * refuse la connexion alors que la chaine est valide (certutil la construit
 * jusqu'a ISRG Root X1 sans erreur). On passe donc par un tunnel SSH, et
 * Chromium resout le nom vers le port local.
 *
 * Ce script mesure et affiche, il ne conclut pas.
 */
import { chromium } from "playwright";

const HOTE = "sdcd-72-60-188-156.sslip.io";
const BASE = `https://${HOTE}`;
const SESSION = process.env.SESSION_CMS;
const SORTIE = process.env.DOSSIER_CAPTURES || ".";

const navigateur = await chromium.launch({
  args: [`--host-resolver-rules=MAP ${HOTE} 127.0.0.1:8443`],
});
const contexte = await navigateur.newContext({ ignoreHTTPSErrors: true });
if (SESSION) {
  await contexte.addCookies([
    { name: "sessionid", value: SESSION, domain: HOTE, path: "/", httpOnly: true, secure: true },
  ]);
}

const erreurs = [];
const page = await contexte.newPage();
page.on("console", (m) => {
  if (m.type() === "error") erreurs.push(m.text().slice(0, 200));
});
page.on("response", (r) => {
  if (r.status() >= 400) erreurs.push(r.status() + " " + r.url().slice(0, 120));
});
page.on("requestfailed", (r) =>
  erreurs.push("requete " + r.url().slice(0, 90) + " " + (r.failure()?.errorText || ""))
);

const titre = (t) => console.log("\n" + t + "\n" + "-".repeat(t.length));

async function aller(url, largeur = 1280) {
  await page.setViewportSize({ width: largeur, height: 950 });
  const r = await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 });
  return r?.status();
}

// ------------------------------------------------- formulaire refuse
titre("Formulaire de contact refuse");
await aller("/contact/");
await page.fill("#id_votre_nom_complet", "Essai automatique").catch(() => {});
await page.fill("#id_votre_adresse_electronique", "pas-un-courriel").catch(() => {});
await page.fill("#id_votre_message", "Message d'essai.").catch(() => {});
// Le titre reste vide a dessein : deux erreurs valent mieux qu'une.
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle", timeout: 30000 }).catch(() => {}),
  page.locator("form input[type=submit]").click({ force: true }).catch((e) => {
    erreurs.push("clic envoi : " + e.message.slice(0, 80));
  }),
]);
await page.waitForTimeout(800);
console.log(
  "  ",
  JSON.stringify(
    await page.evaluate(() => {
      const err = [...document.querySelectorAll(".sdcd-champ__erreur")];
      const brut = [...document.querySelectorAll(".errorlist")];
      const focus = document.querySelector("[autofocus]");
      return {
        erreursSdcd: err.length,
        listesBrutes: brut.length,
        couleur: err[0] ? getComputedStyle(err[0]).color : null,
        balise: err[0]?.tagName || null,
        autofocusSur: focus?.id || null,
        champsInvalides: document.querySelectorAll("[aria-invalid=true]").length,
      };
    })
  )
);
await page.screenshot({ path: `${SORTIE}/contact-erreurs.png` });

// ------------------------------------------------- fil d'Ariane
titre("Fil d'Ariane : bouton et contenu");
for (const l of [1280, 375]) {
  await aller("/mentions-legales/", l);
  console.log(
    "  ",
    l,
    JSON.stringify(
      await page.evaluate(() => {
        const b = document.querySelector(".sdcd-breadcrumb__bouton");
        const c = document.getElementById("page-breadcrumb");
        return {
          bouton: b ? getComputedStyle(b).display : "absent",
          liste: c ? getComputedStyle(c).display : "absente",
          annonce: b?.getAttribute("aria-expanded"),
        };
      })
    )
  );
}
await page.locator(".sdcd-breadcrumb__bouton").click().catch(() => {});
await page.waitForTimeout(400);
console.log(
  "   apres clic (375) :",
  JSON.stringify(
    await page.evaluate(() => {
      const b = document.querySelector(".sdcd-breadcrumb__bouton");
      const c = document.getElementById("page-breadcrumb");
      return {
        liste: c ? getComputedStyle(c).display : "absente",
        annonce: b?.getAttribute("aria-expanded"),
      };
    })
  )
);

// ------------------------------------------------- back-office
if (SESSION) {
  titre("Back-office : page d'accueil");
  const code = await aller("/cms-admin/");
  const admin = await page.evaluate(() => {
    const n = document.querySelector(".sf-notice");
    return {
      connecte: !document.querySelector("input[name=password]"),
      notices: document.querySelectorAll(".sf-notice").length,
      fondNotice: n ? getComputedStyle(n).backgroundColor : null,
      bordureNotice: n ? getComputedStyle(n).borderLeftColor : null,
    };
  });
  console.log("   code", code, JSON.stringify(admin));
  await page.screenshot({ path: `${SORTIE}/admin-accueil.png` });

  const idPage = process.env.PAGE_A_EDITER;
  if (idPage) {
    titre("Back-office : edition d'une page (selecteur d'icone)");
    await aller(`/cms-admin/pages/${idPage}/edit/`);
    await page.waitForTimeout(3000);
    const icone = await page.evaluate(() => {
      const w = document.querySelector(".icon-picker-widget");
      if (!w) return { widget: "absent de cette page" };
      const champ = w.querySelector("input[type=text]");
      const liste = document.getElementById((champ?.id || "") + "-liste");
      return {
        widget: "present",
        champVisible: champ ? getComputedStyle(champ).display !== "none" : null,
        suggestions: liste ? liste.options.length : 0,
        apercu: !!w.querySelector(".icon-picker-widget__apercu"),
      };
    });
    console.log("  ", JSON.stringify(icone));
    await page.screenshot({ path: `${SORTIE}/admin-edition.png` });
  }

  const idApercu = process.env.PAGE_A_PREVISUALISER;
  if (idApercu) {
    titre("Apercu d'un modele de page (fonds, etiquettes, badges, etapier)");
    await aller(`/cms-admin/pages/${idApercu}/view_draft/`);
    await page.waitForTimeout(2500);
    const rendu = await page.evaluate(() => {
      const avecFond = [...document.querySelectorAll("[style*='sdcd-fond-']")];
      return {
        sectionsAvecFond: avecFond.length,
        fondsTransparents: avecFond.filter(
          (e) => getComputedStyle(e).backgroundColor === "rgba(0, 0, 0, 0)"
        ).length,
        etiquettes: document.querySelectorAll(".sdcd-tag").length,
        badges: document.querySelectorAll(".sdcd-badge").length,
        segmentsEtapier: document.querySelectorAll(".sdcd-stepper__segment").length,
        segmentsFaits: document.querySelectorAll(".sdcd-stepper__segment--fait").length,
        classesFrResiduelles: [...document.querySelectorAll("[class]")].filter((e) =>
          [...e.classList].some((c) => /^fr-/.test(c))
        ).length,
        classesCmsfr: [...document.querySelectorAll("[class]")].filter((e) =>
          [...e.classList].some((c) => /^cmsfr-/.test(c))
        ).length,
        debordement:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    console.log("  ", JSON.stringify(rendu));
    await page.screenshot({ path: `${SORTIE}/apercu-modele.png`, fullPage: true });
  }
}

titre("Erreurs de console et requetes en echec");
console.log("  ", erreurs.length ? erreurs.slice(0, 8) : "aucune");

await navigateur.close();
