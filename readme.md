# SDCD — Système de design RDC

Le **Système de design RDC (SDCD)** est l'identité numérique
universelle, officielle et juridique de l'ensemble des sites de l'État de la
**République Démocratique du Congo** — l'équivalent congolais du
[DSFR](https://www.systeme-de-design.gouv.fr) français
([GouvernementFR/dsfr](https://github.com/GouvernementFR/dsfr), source d'inspiration
structurelle, jamais copié : la marque française, Marianne et la typographie
Marianne sont propriété de l'État français et exclues d'usage).

Objectif : que tout usager reconnaisse **immédiatement** un site officiel de la
République (gouv.cd), du portail national au site d'une commune, et que rien ne
ressemble à un site privé.

## Décisions actées (avec le commanditaire)

- **Sigle** : SDCD · **Domaine** : gouv.cd (déclinable : numerique.gouv.cd…)
- **Palette officielle** (issue du drapeau, codes fournis) : bleu `#0095C9`
  dominant, jaune `#FFF24B` et rouge `#DB3832` en accents rares.
- **Marque d'État** : armoiries (fournies, `assets/armoiries-rdc.png`) +
  bloc typographique « RÉPUBLIQUE DÉMOCRATIQUE DU CONGO » + devise
  « Justice · Paix · Travail », déclinée par entité (Présidence, Primature,
  ministères, provinces, agences, communes).
- **En-tête retenu (variante A)** : mention « site officiel » en bandeau
  utilitaire, filet tricolore 4 px en haut de page, marque + intitulé d'entité,
  sélecteur de langue FR ▾ (menu), navigation sur un second rang soulignée bleu.
- **Langues** : FR (référence), EN, Lingala, Swahili, Kikongo, Tshiluba.
- **Mode sombre** : oui (attribut `data-theme="dark"`).
- **Icônes** : Remix Icon (jeu libre du DSFR).
- **Loader officiel** : anneau tricolore 3D fourni par le commanditaire,
  adapté au système (composant Loader).
- **Images** : jamais générées — emplacements de dépôt ou aplats sobres.
- **Accessibilité** : principe affiché (référentiel cible « RGAA-RDC »).

## Sources

- Inspiration structurelle : https://www.systeme-de-design.gouv.fr ·
  https://github.com/GouvernementFR/dsfr (non copié).
- Assets fournis par le commanditaire : armoiries (2 fonds), logo blanc à barre
  tricolore verticale (`assets/logo-blanc-tricolore.png`, pour fonds sombres),
  CSS du loader tricolore.

## Fondamentaux de contenu

**Langue.** Français d'abord (`lang="fr"`), typographie française soignée :
espace fine insécable avant `: ; ! ?`, guillemets « … », apostrophe courbe ’.
Six langues prévues ; le sélecteur d'en-tête porte les codes FR · EN · LN · SW ·
KG · TS.

**Registre.** Institutionnel, calme, factuel. Vouvoiement, impératif de service
(« Effectuez votre démarche », « Consultez le Journal officiel »). Jamais
d'exclamation, jamais de ton publicitaire, **jamais d'emoji**.

**Casse.** Phrase partout (boutons, titres, liens). Deux exceptions : la marque
d'État (« RÉPUBLIQUE DÉMOCRATIQUE DU CONGO » en capitales) et les sur-titres
(eyebrows) en capitales espacées.

**Vocabulaire.** *Démarche*, *service en ligne*, *Journal officiel*, *texte
officiel*, *annuaire des institutions*, *espace citoyen*, *entité*, *marque
d'État*, *site officiel*.

**Micro-copie type.**
- Bandeau : « Site officiel de la République Démocratique du Congo —
  vérifiez que l'adresse se termine par .gouv.cd »
- Vide : « Aucun résultat pour votre recherche. »
- Erreur : « Ce champ est requis. »

## Fondations visuelles

**Brief.** Épuré, professionnel, sans bricolage : blanc dominant, bleu ciel
d'État, filets fins, angles quasi droits, aucune ombre décorative, aucun
dégradé décoratif. La particularité vient de trois signatures : le **filet
tricolore** 4 px en haut de chaque page, la **marque d'État** aux armoiries,
et le **soulignement bleu** des navigations et liens.

**Couleurs.** Le bleu d'État se lit sur deux registres, et c'est la règle
cardinale du système :

- `--sdcd-bleu #0095C9` est la **teinte de marque** — filet tricolore, aplats,
  armoiries. Elle ne porte **jamais** de texte ni de contrôle : son contraste
  sur blanc est de 3,42:1, sous le seuil de 4,5:1.
- `--sdcd-bleu-action #00729A` est la **teinte d'interaction** — liens, nav
  active, bouton primaire, bordure de champ au focus. 5,42:1 sur blanc,
  5,05:1 sur `#F5F7F9`, 4,95:1 sur `#EDF6FA`. Foncée au survol `#005D7C`
  (7,35:1), profonde `#004F6B` (9,01:1) à l'appui.

Jaune `#FFF24B` réservé au filet tricolore, aux surlignages de mise en avant et
au focus sur fond sombre. Rouge du drapeau `#DB3832` réservé au filet. Encres
froides (`#161A1D`, `#56616B`), fonds `#FFFFFF` / `#F5F7F9`, teinte bleue
`#EDF6FA` pour les zones héro. Deux jetons de filets : `--sdcd-ligne #DCE3E8`
pour les séparateurs décoratifs, `--sdcd-ligne-forte #7E8992` (3,57:1) pour la
bordure des contrôles de saisie. Sémantique, chaque teinte vérifiée sur blanc
**et** sur son fond pâle : succès `#197448`, info = bleu d'action, alerte
`#8E5F08`, erreur `#C42E29`. Mode sombre : fonds `#131619/#1B2025`, bleu
éclairci `#4DB8DC`.

Deux jetons de premier plan suivent le thème et doivent être utilisés dès qu'on
pose du texte sur un aplat : `--sdcd-sur-action` (blanc en clair, encre en
sombre — sans quoi le bouton primaire tombe à 2,28:1 en mode sombre) et
`--sdcd-sur-encre` (infobulles). Ne jamais écrire `#fff` en dur sur un aplat.

**Contrat d'accessibilité.** Toute couleur portant du texte est tenue à
≥ 4,5:1, toute bordure de contrôle ou information graphique à ≥ 3:1, dans les
deux thèmes. Une modification de `tokens/colors.css` qui rompt ce contrat est
un défaut bloquant.

**Typographie.** **Inter** (400→900), grotesque contemporaine à haute x-height,
libre (SIL OFL). Le choix n'est pas esthétique mais **vérifié** : c'est la seule
grotesque libre testée qui écrit correctement les langues nationales. Les
voyelles ouvertes **ɛ** (U+025B) et **ɔ** (U+0254), indispensables au lingala et
au kikongo, manquent à la plupart des grotesques — Work Sans, Public Sans,
Archivo, Barlow, Manrope, Figtree et DM Sans ne les ont pas. Et parmi les cinq
qui les portent, Inter est la seule à **ancrer l'accent aigu combinant** dessus
(écart de chasse 1,5–2,5 px à 200 px, contre 13 à 24 px pour Noto Sans,
Fira Sans, Source Sans 3 et Andika) : sans cet ancrage, `ɛ́` et `ɔ́` s'affichent
avec l'accent décalé.

Code et références légales : **Noto Sans Mono**, seule monospace libre testée à
porter ces glyphes — JetBrains Mono, Fira Mono, IBM Plex Mono et Roboto Mono en
sont dépourvues.

Substitut assumé : un État commande à terme sa propre fonte exclusive. Le
remplacement passe par deux variables, `--sdcd-font` et `--sdcd-font-mono` — mais
toute fonte candidate doit d'abord passer `outils/verifier-fontes.html`, sans
quoi le système perd trois de ses six langues.

Échelle : display 48, h1 36, h2 28, h3 22, h4 18, corps 16, secondaire 14,
mention 12 ; titres denses (interlignage 1,12, interlettrage −0,022 em) ; corps
en 1,5. Liens soulignés par défaut.

**Formes.** **Angles vifs**, sans exception : `--sdcd-rayon` et
`--sdcd-rayon-carte` valent `0`. La seule courbure du système est la pilule
`--sdcd-rayon-pilule` (999 px), réservée aux badges de langue et de statut.
Les contrôles et les cartes passent tous par ces jetons : un État qui voudrait
adoucir ses angles change les deux valeurs et rien d'autre.
Filets 1 px `--sdcd-ligne`. Pas d'ombres portées décoratives — une seule
élévation fonctionnelle `--sdcd-ombre` (menus, modales).

**Interactions.** Survol : fond `--sdcd-bleu-pale` ou bleu foncé ; liens
toujours soulignés au survol. Focus visible : anneau 2 px jaune sur fond bleu,
bleu sur fond clair (`--sdcd-focus`). Appui : assombrissement, pas de scale.
Mouvements sobres : 160 ms `ease-out`, fondu simple ; le seul mouvement
continu est le Loader tricolore. `prefers-reduced-motion` respecté.

**Mise en page.** Conteneur 1200 px max, gouttières fluides 16 → 24 px
(`--sdcd-gouttiere`), grille 12 colonnes, espacement en multiples de 4 px
(échelle 4/8/12/16/24/32/40/64).

**Responsive (obligatoire, `responsive.css`).** Mobile d'abord, aucune page ne
déborde horizontalement. Points de rupture en jetons : `--sdcd-bp-xs` 480,
`--sdcd-bp-sm` 640, `--sdcd-bp-md` 900, `--sdcd-bp-lg` 1024, `--sdcd-bp-xl` 1280.

- Grilles : `class="sdcd-grid"` + `--sdcd-cols` (bureau), `--sdcd-cols-md`
  (≤ 900), `--sdcd-cols-lg` (≤ 1024 : 3 colonnes et plus → 2), `--sdcd-cols-sm`
  (≤ 640, une colonne par défaut). La seule présence
  de `--sdcd-cols` dans un style en ligne suffit.
- Tableaux : `Table` et `DataTable` passent en **cartes empilées** sous 640 px
  (`data-empilable` + `td[data-label]`), et restent des tableaux défilants
  (`.sdcd-scroll-x`) au-dessus.
- Menus latéraux : `.sdcd-aside` + `.sdcd-voile` deviennent un tiroir sous 900 px ;
  la navigation d'en-tête devient un bouton « Menu » (`Header`).
- Affichage conditionnel : `.sdcd-desktop-only` / `.sdcd-mobile-only` (900 px),
  `.sdcd-sm-hide` / `.sdcd-sm-only` (640 px).
- Typographie fluide en `clamp()` ; cibles tactiles ≥ 44 px sur écran tactile.

Le principe est documenté dans le kit de documentation : Principes →
« Mobile et responsive ».

## Iconographie

**Remix Icon** (v4, licence Apache 2.0), la ligne (`-line`) par défaut,
la version pleine (`-fill`) uniquement pour l'état actif. Chargé par CDN
(`assets/fonts.css`) — à auto-héberger en production. Usage :
`<i class="ri-government-line"></i>`. Jamais d'emoji, jamais de SVG dessiné à
la main. Glyphes canoniques : ri-government, ri-file-text, ri-search, ri-user,
ri-global, ri-arrow-right, ri-external-link, ri-checkbox-circle,
ri-error-warning, ri-information, ri-close, ri-menu, ri-moon/ri-sun.

**Marque.** `assets/armoiries-rdc.png` (fond transparent, version serrée),
`assets/armoiries-rdc-padded.png` (marges), `assets/logo-blanc-tricolore.png`
(blanc, pour fonds sombres/bleus). Ne jamais redessiner les armoiries.

## Utiliser le système sans React

La présentation vit intégralement dans `components.css`. Un site en PHP, Django,
Symfony ou en HTML statique n'a qu'à lier `styles.css` et écrire le balisage :

```html
<link rel="stylesheet" href="styles.css">

<button type="button" class="sdcd-button sdcd-button--primaire">Effectuer la démarche</button>
<button type="button" class="sdcd-button sdcd-button--secondaire sdcd-button--sm">
  <i class="sdcd-button__icone ri-download-line" aria-hidden="true"></i>Télécharger
</button>
```

**Convention.** `.sdcd-<composant>` pour le bloc, `__element` pour ses parties,
`--modificateur` pour ses variantes. Le nom de classe se déduit du nom du
composant React (`<Button>` → `.sdcd-button`) et le modificateur reprend la
valeur de prop (`variant="secondaire"` → `.sdcd-button--secondaire`).

**Les états ne sont jamais portés par du JavaScript.** Survol, appui, focus et
désactivation sont en CSS (`:hover`, `:active`, `:focus`, `:disabled`). Les
états sélectionnés s'appuient sur les attributs ARIA que le balisage doit de
toute façon porter : `aria-current="page"`, `aria-checked`, `aria-selected`,
`aria-pressed`, `aria-expanded`. L'erreur d'un champ se déclare par
`aria-invalid="true"` — un seul attribut sert l'accessibilité et le style.

**Valeurs dynamiques.** Les rares dimensions paramétrables passent par une
propriété personnalisée en style en ligne, jamais par une classe :
`--sdcd-marque-taille` (BlocMarque), `--sdcd-loader-taille` (Loader),
`--sdcd-table-min` (largeur minimale d'un tableau défilant), `--sdcd-cols`
(grilles).

`exemples/sans-react.html` est la page de référence : elle ne charge aucun
script et exerce l'essentiel du catalogue.

**Migration terminée : les 59 composants sont en CSS**, et plus aucune couleur
n'est codée en dur. Ne subsistent en style en ligne que les valeurs qu'une
feuille statique ne peut pas connaître : propriétés personnalisées listées
ci-dessus, couleurs de séries pilotées par les données, géométrie SVG des
graphiques, et le décalage du `Tabnav` mesuré au runtime.

**Bascule de thème.** Une transition CSS ne réévalue pas une valeur issue d'un
`var()` quand le jeton change : un élément déjà rendu garde la couleur résolue
avant la bascule. Tout code qui change `data-theme` à chaud doit donc poser la
classe `.sdcd-sans-transition` sur `<html>`, changer l'attribut, puis retirer la
classe à la frame suivante. Le composant `Display` le fait ; un intégrateur qui
écrit son propre sélecteur de thème doit reproduire ce geste.

## Version et licence

Version courante : **0.7.0** (voir `CHANGELOG.md`). Le `0.x` est assumé :
l'API des composants et les noms de classes ne sont pas encore gelés ; ils le
seront à la 1.0.0, une fois la couche CSS éprouvée sur un premier site réel.
Un changement de valeur d'un jeton de couleur sera traité comme une rupture
majeure à partir de la 1.0.0.

Code et documentation sous **licence MIT** ; **marque d'État réservée**
(armoiries, logo, filet tricolore, dénomination SDCD) — voir `LICENSE.md`.
Le régime juridique reste **à valider par le commanditaire**.

Contrôle du contrat d'accessibilité :

```
npm test          # contraste : node outils/verifier-contraste.mjs
```

Couverture typographique des six langues : ouvrir `outils/verifier-fontes.html`
dans un navigateur (le test exige un moteur de rendu, il ne peut pas tourner en
ligne de commande).

## Index

- `adaptateurs/` — Jinja2 (FastAPI, Flask) et thème WordPress. Voir
  `adaptateurs/readme.md`.
- `dist/` — **distribution** : `sdcd.min.css` et `sdcd.js`, à charger tels quels.
- `sdcd.js` — comportements sans React : c'est ce fichier qui pose les
  attributs ARIA dont dépend le CSS. Sans lui, les composants s'affichent mais
  ne réagissent pas.
- `styles.css` — point d'entrée des sources (imports).
- `utilitaires.css` — espacement, typographie, affichage, surfaces.
- `components.css` — présentation de tous les composants convertis.
- `exemples/sans-react.html` — catalogue en HTML seul, sans JavaScript.
- `package.json` — nom, version, `exports`, script de vérification.
- `LICENSE.md` — MIT + marque d'État réservée. `CHANGELOG.md` — journal.
- `outils/verifier-contraste.mjs` — vérificateur du contrat d'accessibilité.
- `responsive.css` — couche responsive (grilles, tiroirs, utilitaires).
- `ui_kits/modeles` — gabarits de pages, rangés par familles : **Parcours usager**
  (9) et **Comptes et accès** (9 : connexion usager, connexion agent, création de
  compte, vérification du code, double authentification, mot de passe oublié,
  nouveau mot de passe, déconnexion, compte bloqué). Règle OTP : 6 chiffres,
  5 minutes. Les écrans usagers portent la marque d'État pleine hauteur et une
  ligne en kiswahili ; les écrans agents sont sobres et mentionnent la traçabilité.
- `components/overlays/BandeauCookies.jsx` — composant `CookieConsent` ; le
  fichier ne doit **pas** s'appeler `CookieConsent.jsx` : les bloqueurs de
  contenu filtrent cette URL et le composant ne se charge plus.
- `tokens/` — `colors.css` (light + dark), `typography.css`, `spacing.css`.
- `base.css` — reset, corps de texte, liens, focus, utilitaires (.sdcd-container).
- `assets/` — armoiries, logo blanc, `fonts.css` (fontes + Remix Icon).
- `guidelines/` — cartes de fondations (onglet Design System).
- `components/` — buttons/ · forms/ · navigation/ · data-display/ · feedback/ ·
  content/ (Article, Tabs, Accordion, Quote, Pagination, Callout) · media/
  (Carousel, Gallery, MediaPlayer, TagCloud) · services/ (Calendar, Rdv,
  Tracking) · charts/ (BarChart, LineChart, DonutChart) · overlays/ (Modal,
  Tooltip, CookieConsent).
- `ui_kits/admin/` — POC back-office MINESURSI (équivalences de diplômes) :
  coquille institutionnelle + tableau de bord agent ; écrans 2-12 à la demande.
- `ui_kits/minesursi/` — site public associé au back-office (démarche
  d’équivalence côté citoyen : dépôt, suivi, coûts).
- `ui_kits/email/` — 3 courriels officiels (notification de suivi, convocation
  à un rendez-vous, lettre d’information) : tables, mode sombre, pied RGPD.
- `ui_kits/modeles/` — 9 pages de démonstration complètes et fonctionnelles
  (fiche démarche, réclamation, demande de service, tutoriel de connexion,
  article, suivi de dossier, rendez-vous, médiathèque, données).
- `ui_kits/portail/` — accueil gouv.cd · `ui_kits/ministere/` — site type d'un
  ministère · `ui_kits/doc/` — site de documentation du SDCD (méga-menu).
- `candidates/` — variantes d'en-tête explorées (A retenue).
- `SKILL.md` — compatibilité Agent Skills.

**Ajouts intentionnels** (pas de source composant fournie — jeu standard) :
Button, IconButton, Input, Select, Checkbox, Radio, Toggle, SearchBar, Header,
Footer, Breadcrumb, LangMenu, Card, Tile, Badge, Table, Alert, Loader (fourni
par le commanditaire), Notice, Article, Tabs, Accordion, Quote, Pagination,
Carousel, Gallery, MediaPlayer, TagCloud, Calendar, Rdv (rendez-vous),
Tracking (suivi de dossier), BarChart, LineChart, DonutChart (inspirés de
dsfr-chart, bascule graphique/tableau), Modal, Tooltip, CookieConsent,
Callout, Sidemenu, Stepper, SkipLink, Follow, Tag, Upload, Wizard (assistant
de démarche multi-étapes avec validation et récapitulatif), DataTable
(tableau avancé : filtre, tri, pagination, export CSV, édition en ligne),
BlocMarque, ConnectButton (identité numérique « CongoConnect »), Segmented,
Range, Password, Highlight, Lien, Summary, Share, Tabnav, Dropdown, Display.
**Couverture DSFR v1.15** : tous les composants stables ont leur équivalent ;
restent en feuille de route : Combobox (bêta), En-tête connectée (variante),
Zone d’expression visuelle (bêta).

**Caveats.** Fontes et icônes via CDN Google Fonts / Remix Icon (libres) — à
auto-héberger pour la production ; une fonte exclusive d'État reste à
commander. Photos absentes par principe (zones de dépôt).
