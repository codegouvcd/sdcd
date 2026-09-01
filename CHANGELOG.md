# Journal des modifications — SDCD

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versionnage : [SemVer](https://semver.org/lang/fr/). Un changement de valeur
d'un jeton de couleur est considéré comme **majeur** au-delà de la 1.0.0.

## [0.17.0] — 2026-09-01

Version issue d'un audit au navigateur, sous Brave, du site et du back-office :
etats interactifs compris, et pour la premiere fois en theme sombre.

### Le contresens du portage flexbox → grille

Une seule erreur expliquait trois defauts visibles. En flexbox, aligner une
rangee — `justify-content` — deplace l'ensemble sans toucher a la largeur des
colonnes. Le portage l'a traduit en `justify-items`, qui redimensionne CHAQUE
enfant a la largeur de son contenu.

- Le formulaire de connexion du back-office s'affichait colle a gauche : 24 px
  de marge d'un cote, 861 de l'autre.
- A 768 px, trois tuiles empilees prenaient 655, 605 et 455 px : un escalier.
- Les cartes d'une meme rangee se terminaient a des hauteurs differentes — la
  colonne s'etirait, la carte gardait sa hauteur naturelle.

Les trois modificateurs d'alignement repassent en `stretch`. Le placement est
obtenu en decalant l'enfant unique, condition `:only-child` sans laquelle
plusieurs enfants s'empileraient sur la meme colonne de depart.

### Corrige

- **Le menu mobile ne s'empilait pas.** Le `<nav>` passait en colonne, mais pas
  la liste qu'il contient : les entrees se rangeaient deux par deux et leurs
  filets de separation se croisaient. Sur un telephone, le menu principal etait
  illisible.
- **Cibles tactiles sous le seuil de 24 px** : liens du pied 17 px, fil d'Ariane
  15 px, titre de service 23 px, listes de liens 20 px. L'exception du critere
  2.5.8 ne couvre que les liens en ligne dans un texte.
- **Cases a cocher non habillees** : le navigateur les rendait a 13 px, en bleu
  systeme. `accent-color` les colore sans reconstruire le controle, ce qui
  preserve le comportement natif au clavier et au lecteur d'ecran.
- **Titre de service souligne en permanence.** `text-decoration: none` etait pose
  sur le `<p>` interieur : sans effet, un soulignement declare par un ancetre ne
  pouvant pas etre annule par un descendant.
- **Lignes trop longues** dans l'alerte (147 caracteres) et la mise en exergue
  (149), mesurees a 1440 px.
- Un groupe de badges debordait de 4 px du media d'une carte ; le premier
  element des mentions legales depassait de 12 px hors de sa liste.

### Modifie

- `--sdcd-mesure` passe de `42rem` a `42em`. En largeur fixe, la borne donnait
  75 caracteres a 16 px mais 91 des qu'un bloc employait un corps plus petit.
  L'essai en `ch` fut pire — l'unite vaut la largeur du zero, plus large que la
  moyenne des lettres dans Inter, et laissait passer 103 caracteres.

### Verifie, sans defaut

- **Theme sombre** sur les dix modeles de pages, jamais regarde jusqu'ici :
  aucun defaut de contraste. Les jetons sont employes partout, aucune couleur
  n'est ecrite en dur.

## [0.16.1] — 2026-08-31

### Corrige

- **La police d'icones debordait sur le texte de l'element.** La feuille amont de
  Remix Icon pose `font-family: remixicon !important` sur l'ELEMENT. Un element
  portant a la fois la classe d'icone et du texte — bouton, lien, etiquette,
  ligne de detail d'une carte — voyait son libelle rendu dans la police
  d'icones, qui n'a aucune lettre latine : le navigateur remplaçait caractere
  par caractere et le texte s'affichait a empattements, plus petit que le reste
  de la page.

  Ce motif est celui du CMS, herite du DSFR, ou les icones etaient des masques
  CSS que la classe n'imposait pas au texte. Le passage a une police d'icones a
  rendu le defaut visible partout a la fois : dix gabarits composent ainsi leurs
  classes.

  Le glyphe vit de toute facon dans `::before`. La police y est deplacee ;
  l'element garde la sienne.

## [0.16.0] — 2026-08-31

Version issue d'une revue complete du CMS Sites Conformes, ou le portage avait
laisse des composants sans habillage et des boutons sans effet. Ce que le portage
n'avait pas vu : les selecteurs CSS et les crochets JavaScript ne vivent pas dans
des attributs `class`, seuls endroits que le controle automatique inspectait.

### Ajoute

- `.sdcd-header__outils` — liste des outils d'en-tete. Menu haut, selecteur de
  langue et menu de compte ont chacun un `<li>` pour racine : sans liste
  englobante, ils flottaient comme des `<li>` orphelins dans un `<div>`, balisage
  invalide qui prive les lecteurs d'ecran du regroupement et du decompte.
- `.sdcd-champ__erreurs` — Django enveloppe les erreurs d'un champ dans un `<ul>`.
  Sans reinitialisation, la puce noire du navigateur s'affichait a cote du
  message rouge.
- `data-sdcd-replie` — un bouton place a l'interieur d'une region depliee peut
  la nommer pour la refermer. Le declencheur correspondant repasse a
  `aria-expanded="false"`, pour que l'etat annonce reste celui du DOM. Comble
  l'absence relevee sur le bouton « Fermer » d'un mega-menu.

### Corrige

- **Le fil d'Ariane s'affichait deplie sous 640 px, bouton compris.** La regle
  ajoutee en 0.15.1 masquait le bouton au-dessus de 640 px mais laissait la liste
  visible en dessous : le mobile montrait a la fois « Voir le fil d'Ariane » et le
  fil. Le gabarit pose maintenant `hidden`, et la feuille responsive reaffiche la
  liste au-dessus de 640 px, ou le bouton n'existe plus pour la deplier.

### Retire

- `.sdcd-header__entite` et `.sdcd-header__sous-titre`. Ces deux classes,
  inventees lors de la reecriture de l'en-tete, repetaient mot pour mot
  `.sdcd-header__service` et `.sdcd-header__service-accroche`, qui sont les noms
  du systeme et les cibles de la correspondance de portage. Deux noms pour un
  role finissent toujours par diverger : c'est arrive ici, ou le gabarit emettait
  l'un et les tests attendaient l'autre.

## [0.15.3] — 2026-08-30

### Corrige

- **Le selecteur de theme ne changeait rien.** Le gestionnaire lisait `el.value`
  sur le `<label>`, qui n'a pas de propriete `value` : le mode retombait donc
  toujours sur « systeme », quel que soit le choix du visiteur. Il lit desormais
  le bouton radio contenu, qui est le balisage naturel d'un choix exclusif.

  Constate en activant le selecteur sur le CMS : cliquer « Sombre » laissait la
  page en clair, l'attribut `data-theme` et le stockage inchanges.

- **Une modale fermee restait affichee.** Un `<dialog>` sans `open` est masque
  par la feuille du navigateur, mais `.sdcd-modal__voile { display: flex }` la
  supplantait : il subsistait un fragment de 54 x 6 px sur la page.

## [0.15.2] — 2026-08-30

### Corrige

- **Un enfant de `.sdcd-grille` sans classe de colonne etait ecrase sur une
  piste.** En flexbox il prenait sa largeur naturelle ; dans une grille a douze
  pistes il se retrouvait a 74 px sur 1 152, et son texte se brisait mot par mot.
  Constate sur le plan du site du CMS.

  `.sdcd-grille > *:not([class*="sdcd-col"])` occupe desormais la ligne entiere.
  Le defaut n'existait pas avant le passage a la grille : il devait donc etre
  traite dans la grille, et non gabarit par gabarit, ou il serait revenu au
  premier oubli.

  Cas ajoute au banc d'essai de `verifier-grille`.

## [0.15.1] — 2026-08-30

### Corrige

- **Le bouton du fil d'Ariane etait inerte.** Troisieme commande de cette
  famille — apres le menu d'en-tete (0.9.1) et le menu lateral (0.14.0) — a
  porter `aria-expanded` et `aria-controls` sans que rien ne les pilote. Le
  JavaScript du DSFR s'en chargeait ; son retrait avait laisse trois boutons
  morts, chacun decouvert separement.
- **Le bouton s'affichait sur grand ecran**, ou le fil est deja deplie : la page
  montrait a la fois « Voir le fil d'Ariane » et le fil lui-meme. Il n'apparait
  plus qu'en dessous de 640 px.

## [0.15.0] — 2026-08-30

Version qui acheve le portage du CMS : **plus aucune classe DSFR** n'y subsiste.
Chaque ajout ci-dessous repond a un usage constate dans un gabarit reel.

### Ajoute — composants et primitives

Exergue, infobulle et son ancre, separateur « ou », mega-menu, champ de mot de
passe, groupe de cases a cocher, etats d'erreur, groupes de messages et de liens,
logotype textuel, parties complementaires de l'en-tete, enveloppes de tableau,
onglet a icone, titre de partage, parties du bouton de connexion, region
repliable, bloc « suivez-nous », video responsive, mode deuil, proportions
d'image, ordre inverse d'un groupe de boutons, modificateurs de tuile.

### Ajoute — teintes d'illustration

Dix-huit classes `--chart-1` a `--chart-6` sur l'exergue, la mise en avant, le
badge, la citation et le bandeau.

**Ces classes etaient offertes au rediger et n'existaient nulle part** : il
choisissait une couleur, rien ne se produisait. Le defaut vivait dans le CMS
depuis l'origine ; le portage l'a mis au jour.

La teinte ne porte **que l'accent** — filet, bordure — jamais le texte ni un
aplat. Ce n'est pas une preference : `--sdcd-chart-1` ne fait que 3,0:1 sur
blanc et echouerait le contrat de contraste comme couleur de texte. Une bordure
releve de WCAG 1.4.11 et n'a besoin que de 3:1.

### Ajoute — grille

`--haut` et `--bas` pour l'alignement vertical.

### Note sur le decalage relatif

`fr-col` sans numero signifie « part egale » en flexbox. Trois implementations
en CSS Grid ont ete mesurees au navigateur, dont `grid-column-end: -1` : aucune
ne tient, un `grid-column-end` seul avec un debut automatique valant une portee
de 1. La compatibilite reglait deja `.fr-col` sur `span 12`, exactement comme
`.sdcd-col` : le portage de ces vingt colonnes est donc sans effet visuel.

## [0.14.1] — 2026-08-30

### Ajoute

- **`.sdcd-footer__legaux`**, conteneur des mentions de bas de page. Les
  elements `.sdcd-footer__legal` sont des freres separes par un filet, mais rien
  ne les groupait : une integration les posait donc en `<li>` hors liste —
  balisage invalide, et le navigateur affichait leurs puces. Constate sur le pied
  de page du CMS.

## [0.14.0] — 2026-08-30

### Ajoute — la liste de navigation est enfin admise

`.sdcd-header__nav > ul` et `.sdcd-nav__liste` reprennent la disposition du
`<nav>`. Le composant React rend les liens directement dans le `<nav>` ; une
integration en gabarit les enveloppe presque toujours dans un `<ul>`, qui est le
balisage correct pour une liste de liens et ce qu'attend un lecteur d'ecran. Le
systeme forcait donc les integrations a renoncer a la semantique pour obtenir la
bonne disposition — ce n'etait pas tenable.

### Ajoute — primitives de formulaire et de contenu

- **`.sdcd-fieldset`**, `__legende`, `__element`. Le systeme n'avait pas de jeu
  de champs ; le CMS groupe les siens par intention et attend une legende.
- **`.sdcd-media`**, `__image`, `__legende` — une illustration et sa legende
  dans le fil du contenu.
- **`.sdcd-dropdown__liste`** — un menu deroulant en gabarit enveloppe ses
  entrees dans un `<ul>`.

### Ajoute — comportement

`sdcd.js` traite `.sdcd-sidemenu__entete[aria-controls]` : bascule de
`aria-expanded`, retrait de `hidden` sur la cible. Meme mecanique que le menu
d'en-tete. Sans cela une integration en HTML simple se retrouvait avec un bouton
inerte — le JavaScript du DSFR le pilotait, rien ne l'avait remplace.

## [0.13.0] — 2026-08-30

Sept lacunes relevees en portant le CMS. Aucune n'apparaissait dans le systeme
isole : ce sont les gabarits reels qui les ont fait sortir.

### Ajoute — typographie

- **`--sdcd-h5`, `--sdcd-h6`** et les utilitaires correspondants. L'echelle
  s'arretait a `h4` ; le CMS emploie 27 titres de niveau 5 et 6. Les rabattre
  sur `h4` les aurait grossis. Deux crans de meme graisse et de meme interligne,
  seule la taille descend — jusqu'au corps de texte pour `h6`.

- **`.sdcd-image-fluide`**. Motif si courant qu'il figurait dans dix-huit
  gabarits sans que le systeme le fournisse : chacun le reecrivait.

### Ajoute — composants

- **Menu lateral** : `--collant`, pour garder la navigation a portee sur une
  longue liste.
- **Bandeau** : `__titre` et `__lien`, distincts de `__texte`.
- **Tuile** : `__media` et `__meta` — une tuile peut porter une illustration
  plutot qu'une icone, et une metadonnee sous son intitule.
- **Fil d'Ariane** : `__liste` et `__bouton`. Le composant React rend le fil
  entier ; une integration en gabarit a besoin de nommer ses parties.
- **Badge** : `.sdcd-badges` comme conteneur, et `--sm`.

Non-regression visuelle verifiee a chaque ajout : 0 ecart, 36 composants,
155 elements.

## [0.12.0] — 2026-08-30

### Ajoute — carte

Six modificateurs et deux elements, releves en portant le CMS. Le rediger y
choisit la presentation de chaque carte ; sans eux, le portage aurait supprime
une capacite editoriale existante — une regression deguisee en migration.

- `--horizontal`, `--gris`, `--sans-fond`, `--sans-bordure`, `--ombre`,
  `--telechargement`
- `__actions` — boutons ou liens au bas de la carte, distincts de `__pied` qui
  porte la metadonnee et la fleche
- `--cliquable` — etend la zone de clic a partir du lien que la carte contient,
  sans le dupliquer. Le composant React fait de la carte un `<a>` ; une
  integration en gabarit ne le peut pas toujours, le titre portant deja son
  propre lien, et imbriquer un lien dans un lien est invalide.

### Change — ordre du media

`.sdcd-card` passe de `display: block` a une colonne flex, et
`.sdcd-card__media` porte `order: -1`.

Le composant React place le media en premier dans la source ; une integration en
gabarit le place souvent en dernier, parce que le titre est l'element principal
et qu'on l'ecrit d'abord. Les deux ordres rendent desormais la meme chose. Sans
cela, neuf gabarits du CMS auraient du etre restructures — exactement ce qu'un
systeme de design doit epargner a ses integrations.

Non-regression visuelle verifiee : 0 ecart, 36 composants, 155 elements.

## [0.11.1] — 2026-08-30

### Corrige

- **`.sdcd-lien` ne fonctionnait que sur une balise `<a>`.** La classe ne posait
  que la disposition ; la couleur et le soulignement venaient de la regle `a` de
  `base.css`. Un bouton presente comme un lien — « masquer », « tout voir », un
  motif courant — n'heritait donc de rien. La couleur est desormais portee par la
  classe. Aucune derive visuelle : c'est exactement ce que `<a>` avait deja.

### Ajoute

- **`.sdcd-alert--sm`**, variante compacte. Le DSFR la distingue et le CMS
  l'emploie pour ses messages de formulaire.

## [0.11.0] — 2026-08-30

### Ajoute

- **`.sdcd-boutons`**, groupe de boutons. Le systeme n'en avait pas : chaque
  integration alignait ses actions a la main. Vertical par defaut — la
  disposition qui tient sur un telephone — et horizontal a partir du point de
  rupture demande (`--enligne-sm` / `-md` / `-lg`), avec `--centre`, `--droite`
  et `--icones`.

- **`.sdcd-button--tertiaire-bordure`**. Le systeme n'avait que la tertiaire sans
  bordure. Le DSFR distingue les deux a raison : bordee, l'action se lit comme un
  bouton ; sans bordure, comme un lien.

Les deux manques ont ete releves en portant le CMS.

### Note a l'intention des integrations

`.sdcd-button` **seul est neutre** : ni fond, ni bordure visible. Il attend une
variante. C'est l'inverse du DSFR, ou `.fr-btn` seul est primaire — un portage
qui renomme sans ajouter `--primaire` rend les boutons invisibles.

## [0.10.1] — 2026-08-30

### Ajoute

- **`.sdcd-tags`**, conteneur d'une serie d'etiquettes. Le systeme avait
  `.sdcd-tagcloud` — un nuage pondere, autre chose — mais rien pour poser
  simplement des etiquettes cote a cote. Lacune relevee en portant le CMS, dont
  chaque liste d'articles en affiche une.

## [0.10.0] — 2026-08-30

### Ajoute

- **Grille en 12 colonnes** (`utilitaires.css`). Le systeme n'en avait pas : sa
  grille etait pilotee par `--sdcd-cols`, ce qui convient a un composant qui
  declare sa propre repartition, mais pas a une page ou le rediger raisonne en
  colonnes. Son absence rendait impossible le portage de mises en page ecrites
  dans des gabarits — le premier obstacle rencontre en migrant le CMS.

  `.sdcd-grille`, ses modificateurs (`--gouttieres`, `--centre`, `--milieu`,
  `--gauche`, `--droite`), `.sdcd-col`, `.sdcd-col-1..12`, leurs declinaisons
  `sm` / `md` / `lg`, les decalages `.sdcd-col-decale-*` et `.sdcd-conteneur`.

  Implementee en CSS Grid : ni marges negatives, ni largeurs en pourcentage.

- **Espacement au point de rupture `md`** — les 14 proprietes de marge et de
  remplissage sur les 9 pas de l'echelle. Les autres ruptures viendront quand un
  gabarit les demandera ; la sobriete de cette feuille est une decision.

- **`outils/verifier-grille.mjs`**, ajoute a `npm run verifier-grille`. Il mesure
  la largeur reelle de chaque colonne a 1280 et 375 px.

### Deux defauts que ce controle a attrapes avant publication

- Les colonnes qualifiees d'un point de rupture (`sdcd-col-md-6`) **ne se
  repliaient pas** sous ce point : sans regle de base elles retombaient sur
  `span 1`, et cinq colonnes se serraient sur une ligne a 375 px.
- Le **decalage etait ecrase** : `grid-column` en raccourci reinitialise
  `grid-column-start`. Les largeurs emploient donc `grid-column-end`.

Aucun des deux ne se voyait a 1280 px sur un rendu statique.

### Note de portage

Les points de rupture sont ceux du SDCD (sm 640, md 900, lg 1024), non ceux du
DSFR (576, 768, 992). Une mise en page portee bascule donc a des largeurs
differentes : c'est voulu, elle adopte les ruptures du systeme.

## [0.9.3] — 2026-08-30

### Corrigé

- **La garde `[hidden]` de 0.9.2 ne suffisait pas.** Les utilitaires responsive
  portent eux aussi `!important`, et à `!important` égal c'est la spécificité qui
  tranche : `[hidden]` et `.sdcd-mobile-only` valent toutes deux 0-1-0, si bien
  que l'ordre des feuilles décidait — et `responsive.css` est importée après
  `base.css`. Le sélecteur est désormais doublé, `[hidden][hidden]`, soit 0-2-0.

  Constaté en vérifiant la correction précédente sur le site déployé : la
  navigation mobile s'affichait toujours dépliée malgré `hidden`.

## [0.9.2] — 2026-08-30

### Corrigé

- **`hidden` ne masquait pas.** `sdcd.js` masque par l'attribut `hidden`, dont la
  règle du navigateur porte la spécificité la plus faible : toute classe fixant
  `display` la supplante — à plus forte raison les utilitaires responsive, qui
  l'imposent en `!important`. L'élément restait donc **visible tout en étant
  annoncé masqué** aux technologies d'assistance.

  Le défaut touchait les **huit points d'appel** de `afficher()` : accordéon,
  onglets, menus, panneaux. Constaté sur la navigation mobile du CMS, qui
  s'affichait dépliée alors qu'elle portait `hidden`.

  `base.css` pose désormais `[hidden]{display:none!important}`.
  Non-régression visuelle vérifiée : 0 écart sur 36 composants, 155 éléments.

## [0.9.1] — 2026-08-30

### Corrigé

- **Le bouton de menu de l'en-tête n'avait aucun comportement.** `Header.jsx`
  tient cet état dans React, mais la couche JavaScript autonome ne le gérait pas :
  toute intégration en HTML simple — Django, WordPress, FastAPI — se retrouvait
  avec un menu qui **ne s'ouvrait pas du tout sur mobile**. Découvert en portant
  le CMS, où le défaut était masqué tant que le JavaScript du DSFR était présent.

  `sdcd.js` traite désormais `.sdcd-header__menu[aria-controls]` : bascule de
  `aria-expanded`, retrait de `hidden` sur la cible, permutation de l'icône
  menu/fermer. La cible est masquée par `hidden` et non par une classe, pour
  qu'un lecteur d'écran ne l'annonce pas tant qu'elle est fermée.

## [0.9.0] — 2026-08-19

Audit sécurité, responsive et ergonomie, puis correction de ce qu'il a trouvé.

### Corrigé — sécurité

- **11 gestionnaires `onclick` en ligne supprimés**, dans les trois piles.
  Un `onclick` impose `unsafe-inline` dans la politique de sécurité de
  contenu — c'est-à-dire renoncer à la protection principale contre
  l'injection de script. Les composants déclarent désormais leur intention par
  `data-sdcd-fermer-parent` et `sdcd.js` s'en charge par délégation.
  Vérifié : **0 attribut `onclick` dans le DOM rendu**, fermeture opérante.
- **Le paramètre `onclick` est retiré de l'API** de `bouton`, `tag` et
  `button_group`. Il injectait du JavaScript arbitraire dans un attribut :
  dès lors que sa valeur vient du CMS, un rédacteur pouvait exécuter du script
  chez les visiteurs. L'échappement de Django empêchait la sortie de
  l'attribut, pas l'exécution de son contenu.

### Corrigé — responsive

- **Pagination débordant sous 375 px.** Douze pages ne tenaient pas :
  388 px de large pour un écran de 320. `flex-wrap` sur `.sdcd-pagination`.
  Vérifié aux quatre largeurs : **320, 375, 768 et 1280 px, aucun débordement**.

### Corrigé — cibles tactiles

La règle `pointer: coarse` ne posait qu'une hauteur minimale : les boutons
d'icône restaient étroits (`.sdcd-fermer` mesurait 19 px de large). Ajout
d'une largeur minimale pour les commandes carrées, et d'un remplissage
vertical pour les liens de navigation.

Les liens au fil du texte, les titres de carte et de tuile en sont exclus :
**WCAG 2.5.8 réserve une exception aux liens insérés dans un bloc de texte**,
et les agrandir dégraderait la typographie sans rien gagner.

### Ajouté

- **`outils/auditer.mjs`** — audit automatisé : débordement horizontal à
  quatre largeurs, taille des cibles tactiles, visibilité du focus,
  association des étiquettes, messages d'erreur reliés, `aria-controls`
  pointant sur un élément existant, identifiants en double, respect de
  `prefers-reduced-motion`. Sortie 0/1.

### Ce que l'audit a trouvé conforme

| Contrôle | Résultat |
|---|---|
| Indicateur de focus | **39 éléments sur 39** |
| Étiquettes de formulaire | toutes associées |
| Messages d'erreur | reliés par `aria-describedby` |
| `aria-controls` | aucun ne pointe dans le vide |
| Identifiants | aucun doublon |
| `prefers-reduced-motion` | aucune transition ni animation active |
| `innerHTML`, `eval` dans `sdcd.js` | aucun |
| Liens externes | tous avec `rel="noopener"` |

### Signalé, hors périmètre du système

Le CMS `sites-conformes` référence `request.csp_nonce` dans ses gabarits, mais
**aucun middleware CSP n'est installé** : `django-csp` n'est pas une
dépendance et le nonce se résout à vide. Le site n'a donc aujourd'hui aucune
politique de sécurité de contenu. Le SDCD est désormais compatible avec une
CSP stricte ; l'activer relève du CMS.

### Deux réserves sur l'audit lui-même

- La référence visuelle est capturée à 1 280 px avec un pointeur fin : elle ne
  couvre donc pas les règles `pointer: coarse` ni les points de rupture.
- L'audit mesure ce qui se mesure. Il ne dit rien de la clarté des libellés,
  de la logique d'un parcours ni de la pertinence d'un contenu.

## [0.8.0] — 2026-08-19

Non-régression visuelle. Le système peut désormais détecter qu'une
modification a changé l'apparence d'un composant, ce qu'aucun contrôle
précédent ne voyait.

### Ajouté

- **`outils/verifier-visuel.mjs`** — ouvre la galerie dans un Chromium sans
  interface et relève, pour chaque composant, **16 propriétés calculées**
  portant l'identité visuelle : couleurs, bordures, rayons, fonte, graisse,
  interlignage, interlettrage, soulignement, marges internes, casse, opacité.
  Comparaison à `outils/reference-visuelle.json`, sortie 1 en cas d'écart.
- **`outils/galerie.py`** — engendre `outils/galerie.html`, page de référence
  contenant **36 composants**. Elle est produite depuis les macros Jinja2, pas
  écrite à la main : un composant ajouté à l'adaptateur entre automatiquement
  dans le périmètre testé.
- `outils/reference-visuelle.json` — référence figée : 36 composants,
  **155 éléments**, 2 thèmes.

### Pourquoi des propriétés et non des captures d'écran

Une capture diffère d'une machine à l'autre — lissage des polices, échelle,
version du moteur — et produit des faux positifs permanents. Les valeurs
calculées sont stables et disent **ce qui a bougé** : « la couleur du bouton
primaire est passée de X à Y », et non « 0,3 % de pixels ont changé ». Les
dimensions sont volontairement exclues, elles dépendent du viewport.

### Éprouvé dans les deux sens

| Situation | Résultat |
|---|---|
| Aucun changement | **0 écart**, sortie 0 |
| `--sdcd-bleu-action` altéré d'**une unité** (`#00729A` → `#00739A`) | **24 écarts**, sortie 1, nommés composant par composant |

Un test incapable d'échouer ne vaut rien : celui-ci attrape un chiffre
hexadécimal.

### Note d'environnement

Playwright réclame la version de Chromium qu'il a lui-même téléchargée. La
variable `SDCD_CHROMIUM` permet de désigner un exécutable déjà présent, plutôt
que d'en télécharger un second :

```
SDCD_CHROMIUM="…/chrome.exe" node outils/verifier-visuel.mjs
```

`@playwright/test` est en **dépendance de développement** : le paquet livré
reste sans aucune dépendance d'exécution.

### Reste à faire

- Publication npm : `npm whoami` renvoie toujours `ENEEDAUTH`.
- Multilinguisme absent : six langues promises, `LangMenu` n'est qu'un
  sélecteur. Les traductions en langues nationales relèvent de locuteurs, pas
  d'une génération automatique.

## [0.7.0] — 2026-08-19

Adaptateurs FastAPI et WordPress. Le système se consomme désormais depuis
quatre piles, avec les mêmes noms de composants partout.

### Ajouté

- **`adaptateurs/jinja2/sdcd.html` — 31 macros** pour FastAPI, Flask,
  Starlette. Mêmes noms et mêmes paramètres que les tags Django. La racine des
  statiques est redéfinissable par `sdcd_base`.
- **`adaptateurs/jinja2/exemple_fastapi.py`** — application complète : montage
  de `dist/`, chargeur de gabarits, page de démarche avec formulaire.
- **`adaptateurs/wordpress/sdcd/`** — thème autonome. `functions.php` sert la
  feuille et le script depuis le thème, `inc/composants.php` fournit les
  composants en PHP (`sdcd_x()` renvoie, `sdcd_x_e()` affiche), et les gabarits
  `header`, `footer`, `index`, `singular` sont fournis. La distribution est
  embarquée dans `assets/sdcd/` : aucune requête vers un tiers.
- **`adaptateurs/readme.md`** — mode d'emploi des quatre piles.
- Deux vérificateurs : `adaptateurs/jinja2/verifier.py` et
  `adaptateurs/wordpress/verifier.php`, tous deux à sortie 0/1.

### Vérifié

| Contrôle | Résultat |
|---|---|
| 31 macros Jinja2 rendues | **98 classes émises, 0 manquante**, 0 fuite `fr-*` |
| Page FastAPI complète, en navigateur | 43 classes, **0 échec de contraste** sur 29 nœuds, accordéon réactif |
| 7 fichiers PHP au lint | aucune erreur |
| 9 composants WordPress rendus | **38 classes émises, 0 manquante** |

Le contrôle « classes émises ∖ classes définies » est appliqué aux trois
adaptateurs : il garantit qu'aucun ne produit de balisage sans style.

### Écart assumé

Le thème WordPress **n'a jamais tourné dans un WordPress réel**. Les composants
sont rendus avec les fonctions du CMS simulées, ce qui attrape la syntaxe, le
nommage et le balisage — pas les surprises d'intégration.

### Reste à faire

- Publication npm : `npm whoami` renvoie toujours `ENEEDAUTH`.
- Aucun test de non-régression visuelle.
- Multilinguisme absent.

## [0.6.0] — 2026-08-19

Le système devient consommable hors React : couche de comportements, fontes
auto-hébergées, distribution en un fichier.

### Ajouté

- **`sdcd.js` — 385 lignes, sans dépendance.** Le CSS exprimait ses états par
  attributs ARIA ; rien ne les posait hors React. Ce fichier le fait, par
  délégation d'événements sur `document` : interrupteur, contrôle segmenté,
  étiquettes, créneaux, jours de calendrier, accordéon, onglets (flèches
  clavier comprises), carrousel, menus déroulants, tiroir latéral, modale
  `<dialog>`, bascule de thème, défilement discret des tableaux.
  Une API minimale est exposée sur `window.SDCD` pour le contenu injecté à la
  volée.
- **`outils/construire.mjs`** — aplatit la chaîne d'`@import` en un fichier
  unique et le compacte. Contrôle à la construction que **toute `url()` pointe
  sur un fichier réellement présent** ; sortie en erreur sinon.
- **`exemples/comportements.html`** — page manipulable exerçant les
  comportements, sans React ni bibliothèque.
- **`assets/icones.css`** — règles de glyphes Remix Icon, séparées de la
  déclaration de face.

### Modifié

- **Fontes et icônes auto-hébergées.** Plus aucune requête vers Google Fonts ni
  jsDelivr. Pour un service de l'État : plus de fuite d'adresse IP des usagers
  vers un hébergeur étranger, fonctionnement hors ligne, et une latence en
  moins sur les connexions mobiles congolaises.
  Sept fichiers, **548 Ko** : Inter et Noto Sans Mono sont variables, donc un
  seul fichier couvre 400 à 900 ; seuls les sous-ensembles `latin` et
  `latin-ext` sont embarqués — c'est `latin-ext` qui porte ɛ, ɔ et ŋ. Les 15
  autres sous-ensembles servis par Google (cyrillique, grec, vietnamien) sont
  écartés.
- `package.json` en 0.6.0 : `exports` vers la distribution, `files` complet,
  `prepublishOnly` enchaînant construction et vérification.

### Corrigé

- **Interrupteur inopérant hors React.** Le gabarit Django rendait un
  `<input type="checkbox">` alors que le CSS ne réagit qu'à `aria-checked` sur
  la piste : la pastille ne bougeait jamais. Remplacé par un
  `<button role="switch">`, conforme au style comme au motif ARIA.

### Distribution

| Fichier | Poids |
|---|---|
| `dist/sdcd.css` | 246 Ko |
| `dist/sdcd.min.css` | 205 Ko |
| `dist/sdcd.js` | 14 Ko |
| `dist/assets/` | fontes et marque d'État |

Un intégrateur charge **une feuille et un script**, au lieu de dix requêtes en
cascade vers trois domaines.

### Vérifié en navigateur

- Les 14 comportements manipulés un par un : interrupteur, segmenté,
  étiquettes, accordéon, onglets, carrousel, menu de langue — tous posent
  l'attribut attendu et le style suit.
- Depuis `dist/sdcd.min.css` seul : **9 glyphes sur 9** présents en texte,
  3 sur 3 en monospace, accents combinants ancrés (1,5 et 2,5 px), icônes
  rendues depuis le fichier local.
- `npm test` : contrat d'accessibilité respecté.

### Piège consigné

Le script de construction produisait des `url()` relatives fausses : les fontes
étaient introuvables et la page s'affichait dans une **police de repli, sans
aucune erreur visible**. Seule une mesure de glyphes l'a révélé. D'où le
contrôle systématique des chemins désormais intégré à la construction.

### Reste à faire

- Publication du paquet npm : `npm whoami` renvoie `ENEEDAUTH`.
- Adaptateurs Jinja2 (FastAPI) et thème WordPress.
- Aucun test de non-régression visuelle.
- Multilinguisme toujours absent.

## [0.5.0] — 2026-08-18

Ajout de la couche utilitaire, qui manquait pour porter un CMS, et compaction du
pied de page sur petit écran.

### Ajouté

- `utilitaires.css` — **153 règles** : 130 classes d'espacement
  (`.sdcd-mt-4`, `.sdcd-px-5`, `.sdcd-mx-auto`…) sur l'échelle des jetons,
  utilitaires typographiques (`.sdcd-h1` à `.sdcd-h4`, `.sdcd-texte-sm`,
  `.sdcd-texte-mono`), d'affichage, de surface, et `.sdcd-lecteur-seul`.
  Sans eux, 44 des 233 classes utilisées par `sites-conformes` n'avaient
  aucun équivalent.

### Modifié

- **Pied de page compact sous 640 px.** Les colonnes de liens pesaient 515 px
  sur 1 096 px de pied de page à 375 px, soit 1,35 fois la hauteur d'écran.
  Elles deviennent des `<details>` repliés. Mesuré après correctif :
  **667 px, 0,82 écran — 39 % de moins.** Les en-têtes font 44 px, la cible
  tactile minimale. Le rendu par défaut reste déplié : sans JavaScript, le pied
  de page demeure complet et indexable.

### Corrigé

- **Colonnes du pied de page jamais en grille sur desktop.** La règle
  `.sdcd-footer__colonnes` déclarait `--sdcd-cols` mais rien ne le lisait :
  `responsive.css` n'applique cette variable que via `.sdcd-grid` ou un style
  en ligne. Les trois colonnes s'empilaient donc sur toute la largeur. Défaut
  préexistant, révélé en mesurant la hauteur. Après correctif : 3 colonnes de
  362 px à 1 280 px.
- **`<details>` figé après basculement manuel.** React ne resynchronise pas
  l'attribut `open` qu'un usager a modifié : en ouvrant un groupe sur mobile
  puis en repassant en desktop, les colonnes restaient fermées. Une clé
  dépendant du seuil force le remontage.

### Vérifié

- Portail : **0 échec de contraste sur 120 nœuds**, dans les deux thèmes.
- Franchissement du seuil 640 px dans les deux sens : replié/déplié conforme,
  aucun débordement horizontal à 375 px.
- `npm test` : contrat d'accessibilité respecté.

## [0.4.0] — 2026-08-18

Correction d'un défaut de fondation : **le système ne pouvait pas écrire trois de
ses six langues**. Prérequis levé avant d'attaquer le portage de `sites-conformes`.

### Corrigé

- **Typographie incapable d'écrire le lingala, le kikongo et le tshiluba.**
  Schibsted Grotesk ne contient ni **ɛ** (U+025B) ni **ɔ** (U+0254), voyelles
  ouvertes indispensables à ces orthographes, ni les capitales Ɛ Ɔ, ni les
  implosives ɓ ɗ. Chaque occurrence tombait sur une fonte de substitution :
  glyphes dépareillés au milieu du mot. Spline Sans Mono présentait le même trou.
  → **Inter** et **Noto Sans Mono**, vérifiées.

### Méthode

Douze grotesques libres testées. Sept n'ont pas ɛ/ɔ (Work Sans, Public Sans,
Archivo, Barlow, Manrope, Figtree, DM Sans). Cinq les portent (Noto Sans, Inter,
Fira Sans, Source Sans 3, Andika) — mais une seule, **Inter**, ancre l'accent
aigu combinant dessus :

| Fonte | ɛ + U+0301 | ɔ + U+0301 | témoin a + U+0301 |
|---|---|---|---|
| **Inter** | **+2,5 px** | **+1,5 px** | 0 px |
| Noto Sans | +13,4 px | +14,0 px | 0 px |
| Fira Sans | +16,4 px | +13,2 px | 0 px |
| Source Sans 3 | +23,6 px | +18,8 px | 0 px |
| Andika | +15,2 px | +12,8 px | 0 px |

*Écarts de chasse à 200 px. Un accent correctement ancré n'élargit pas la base ;
un écart de 13 à 24 px signifie que l'accent est rendu comme un glyphe qui
avance, donc décalé.* Côté monospace, seule **Noto Sans Mono** porte les glyphes :
JetBrains Mono, Fira Mono, IBM Plex Mono et Roboto Mono en sont dépourvues.

### Ajouté

- `outils/verifier-fontes.html` — vérificateur de couverture typographique :
  présence des 10 glyphes en texte et 8 en monospace, ancrage des accents
  combinants. Validé dans les deux sens (12 défauts sur Schibsted, 0 sur Inter).
  Il exige un moteur de rendu et ne peut donc pas tourner en ligne de commande.

### Vérifié

- Portail : **0 échec de contraste sur 120 nœuds**, aucun débordement à 375 px
  après changement de fonte.
- `npm test` : contrat d'accessibilité respecté.

### Pièges rencontrés, consignés pour la suite

- `document.fonts.check()` renvoie `true` dès que la *face* déclarant la plage
  unicode est chargée — **il n'atteste pas la présence du glyphe**. Inutilisable
  pour ce contrôle.
- Mesurer la chasse derrière **deux** replis seulement produit des faux positifs :
  c'est ce qui m'a fait valider JetBrains Mono à tort. Trois replis distincts
  (monospace, serif, cursive) sont nécessaires.
- Tester la pile complète du jeton (`'Inter',system-ui,sans-serif`) laisse
  `system-ui` s'interposer avant les replis de contrôle : tout paraît présent.
  Il faut isoler la première famille.

## [0.3.0] — 2026-08-18

Fin de l'extraction : **les 59 composants sont passés en CSS**. Plus aucune
couleur codée en dur dans `components/`. Le système est utilisable sans React
sur la totalité du catalogue.

### Ajouté

- Jetons `--sdcd-chart-1` à `--sdcd-chart-6` — palette de séries de graphiques,
  déclinée en thème sombre et vérifiée à ≥ 3:1 sur le fond (WCAG 1.4.11).
  Elle remplace six hex codés en dur qui rendaient les graphiques illisibles
  en thème sombre.
- Classe `.sdcd-sans-transition`, posée par `Display` le temps d'une bascule
  de thème (voir « Corrigé »).

### Modifié

- 14 composants convertis : `BarChart`, `DonutChart`, `LineChart`, `DataTable`,
  `Carousel`, `Gallery`, `MediaPlayer`, `TagCloud`, `BandeauCookies`, `Modal`,
  `Calendar`, `Rdv`, `Tracking`, `Wizard`.
- **Zéro hex codé en dur** dans les 59 composants (44 occurrences à l'audit).
- Les états de ligne de `DataTable` passent par des attributs plutôt que par
  des styles calculés : `data-alerte`, `data-edition`, `aria-selected`. La
  densité devient le modificateur `.sdcd-datatable--dense`.
- `Calendar` et `Rdv` partagent la primitive `.sdcd-creneau` ; l'état retenu
  est porté par `aria-pressed`.
- Le squelette de chargement de `DataTable` n'injecte plus ses `@keyframes`
  dans `document.head`.

### Corrigé

- **Graphiques illisibles en thème sombre.** Les six couleurs de séries étaient
  figées sur la palette claire. Elles suivent désormais le thème : vérifié en
  page, `#0095C9` → `#4DB8DC`.
- **Couleurs figées lors d'une bascule de thème à chaud.** Une transition CSS
  ne réévalue pas une valeur issue d'un `var()` quand le jeton change :
  l'élément conservait la couleur résolue avant la bascule. Sur le bouton
  primaire et `ConnectButton`, le fond restait clair pendant que le texte
  passait en sombre — **3,35:1**. Diagnostic établi par élimination : un
  élément créé après la bascule rendait correctement, et neutraliser la
  transition rétablissait la couleur. `Display` neutralise donc les transitions
  le temps du basculement (double `requestAnimationFrame`, avec repli en
  `setTimeout` car rAF ne se déclenche pas dans un onglet en arrière-plan).
  Après correctif : **7,96:1**. Ce défaut préexistait à l'extraction, les
  styles en ligne d'origine portant la même transition.

### Vérifié

- Back-office, écran Statistiques : **0 échec de contraste sur 134 nœuds**,
  dans les deux thèmes ; séries de graphiques correctes en clair et en sombre.
- Modèles, Médiathèque : **0 échec sur 118 nœuds** dans les deux thèmes après
  correctif ; visionneuse de `Gallery` fonctionnelle, commandes blanches sur
  le voile noir ; translation du `Carousel` opérante.
- `DataTable` : 8 lignes, 6 en-têtes triables, 3 outils, **aucun style en ligne
  sur la table**.
- `npm test` : 66 vérifications du contrat d'accessibilité, sortie 0.

### Corrigé (suite à l'audit de cohérence)

- **Les 59 `.d.ts` ne déclaraient pas `className`**, alors que les 59 composants
  l'acceptent depuis l'extraction. Régression introduite par la conversion :
  le contrat de types mentait sur l'API réelle. Corrigé sur les 59, avec
  `style` ajouté aux 8 déclarations qui l'omettaient également.
- **Contradiction doctrine ↔ jetons sur les rayons**, ouverte depuis le premier
  audit : le readme annonçait « 2 px sur les contrôles, 4 px sur les cartes »
  quand `--sdcd-rayon` et `--sdcd-rayon-carte` valent `0`. La doctrine est
  alignée sur les jetons — angles vifs, la pilule restant la seule courbure.
- `CodeOTP` posait `border-radius: 0` en dur ; passe par `--sdcd-rayon`.
  Ne subsistent que deux `border-radius: 50%` sur les anneaux du `Loader`,
  qui sont de la géométrie, pas une forme de marque.

### Styles en ligne subsistants — par conception

Ne demeurent que les valeurs qu'une feuille statique ne peut pas connaître :
les propriétés personnalisées documentées (`--sdcd-marque-taille`,
`--sdcd-loader-taille`, `--sdcd-modal-largeur`, `--sdcd-carousel-index`,
`--sdcd-tagcloud-taille`, `--sdcd-progression`, `--sdcd-table-min`,
`--sdcd-cols`), les couleurs de séries pilotées par les données, la géométrie
SVG des graphiques, et le décalage du `Tabnav` mesuré au runtime.

## [0.2.0] — 2026-08-18

Extraction du CSS des composants. Le SDCD devient utilisable **sans React** :
`components.css` porte la totalité de la présentation, les composants `.jsx` ne
font plus qu'émettre du balisage et des classes.

### Ajouté

- `components.css` (1 327 lignes) — feuille de style des composants, importée par
  `styles.css`. Convention BEM : `.sdcd-<composant>`, parties en `__element`,
  variantes en `--modificateur`. Le nom de classe se déduit du nom du composant.
- `exemples/sans-react.html` — page de démonstration chargeant **zéro script**,
  qui exerce boutons, marque d'État, formulaire, alertes, badges, étiquettes,
  tuiles, tableau empilable, contenu éditorial, infobulle et loader.
- Prop `className` sur les 45 composants convertis : un consommateur peut
  ajouter ses propres classes sans perdre celles du système.
- Jetons `--sdcd-nouveau` / `--sdcd-nouveau-pale` (le badge « nouveau »
  reposait sur deux hex codés en dur).

### Modifié

- **Les états ne sont plus portés par JavaScript.** 9 composants pilotaient leur
  survol par `onMouseEnter`/`onMouseLeave` et 6 leur focus par
  `onFocus`/`onBlur` : ces états passent en `:hover`, `:active`,
  `:focus`, `:disabled` et `:focus-within`. `Button`, `IconButton`,
  `ConnectButton`, `Card`, `Tile`, `Tooltip` et `SkipLink` n'ont plus aucun
  état React.
- L'état d'erreur des champs est porté par `aria-invalid="true"`, qui sert à la
  fois l'accessibilité et le style — un seul attribut, plus de divergence
  possible entre les deux.
- Les états sélectionnés s'appuient sur les attributs ARIA existants
  (`aria-current`, `aria-checked`, `aria-selected`, `aria-pressed`,
  `aria-expanded`) plutôt que sur une classe parallèle.
- `Loader` n'injecte plus ses `@keyframes` dans `document.head` au montage :
  elles vivent dans `components.css`.
- Le filet tricolore devient `.sdcd-filet-tricolore__bande--{bleu,jaune,rouge}`,
  adossé aux jetons invariants du drapeau, au lieu de 9 hex codés en dur dans
  `Header` et `Footer`.
- Tous les `<button>` des composants convertis portent `type="button"` et toutes
  les icônes décoratives `aria-hidden="true"` — deux défauts relevés à l'audit.

### Vérifié

- Portail : 210 éléments stylés par classe, **0 échec de contraste sur 120
  nœuds de texte**, dans les deux thèmes, aucune erreur JavaScript.
- 360 px : **0 élément débordant**, pas de défilement horizontal, bascule du
  menu mobile fonctionnelle.
- `exemples/sans-react.html` : **0 script**, 68 nœuds de texte, seul le bouton
  désactivé sort du seuil (2,35:1) — état exempté par WCAG 1.4.3.
- `npm test` : 54 vérifications du contrat d'accessibilité, sortie 0.

### Reste à convertir (14 composants sur 59)

`BarChart`, `DonutChart`, `LineChart`, `DataTable`, `Carousel`, `Gallery`,
`MediaPlayer`, `TagCloud`, `BandeauCookies`, `Modal`, `Calendar`, `Rdv`,
`Tracking`, `Wizard`. Ils conservent leurs styles en ligne et fonctionnent
sans changement : le dépôt est dans un état hybride assumé, documenté ici.
Ce sont les composants à géométrie calculée (SVG des graphiques, positionnement
du carrousel et de la visionneuse) et les plus stateful.

## [0.1.0] — 2026-08-18

Première version versionnée et licenciée. Le système existait auparavant sans
numéro de version ni licence, ce qui le rendait inexploitable
contractuellement. Numérotation `0.x` assumée : la couche CSS des composants
n'existe pas encore (les styles vivent en ligne dans les `.jsx`), le système
n'est donc pas réutilisable hors React et l'API n'est pas figée.

### Ajouté

- `LICENSE.md` — MIT pour le code et la documentation, marque d'État (armoiries,
  logo, filet tricolore, dénomination SDCD) réservée aux entités publiques.
  **Régime à faire valider par le service juridique du commanditaire.**
- `package.json` — nom `@gouv-cd/sdcd`, version, `exports` vers les feuilles de
  style et les composants, `npm test`.
- `outils/verifier-contraste.mjs` — vérificateur du contrat d'accessibilité :
  lit `tokens/colors.css`, résout les alias `var()` et contrôle 26 paires
  couleur/fond dans les deux thèmes. Sort en code 1 si une paire échoue.
- Jeton `--sdcd-bleu-action` — teinte d'interaction, distincte de la teinte de
  marque.
- Jeton `--sdcd-bleu-aplat` — bleu profond volontairement **non redéfini** en
  thème sombre, pour les panneaux de marque qui portent `data-theme="dark"`
  sur leur propre contenu.
- Jetons `--sdcd-sur-action` et `--sdcd-sur-encre` — couleurs de premier plan
  posées sur un aplat, sensibles au thème.

### Modifié — accessibilité des couleurs (rupture visuelle mineure)

Toutes les couleurs porteuses de texte sont désormais tenues à ≥ 4,5:1 et les
bordures de contrôle à ≥ 3:1, dans les deux thèmes.

| Jeton | Avant | Après | Contraste sur blanc |
|---|---|---|---|
| `--sdcd-action` | `#0095C9` | `#00729A` | 3,42 → **5,42** |
| `--sdcd-action-survol` | `#00789F` | `#005D7C` | 5,02 → **7,35** |
| `--sdcd-action-appui` | `#005D7C` | `#004F6B` | 7,35 → **9,01** |
| `--sdcd-succes` | `#1B7F4D` | `#197448` | 4,43 → **5,11** *(sur fond pâle)* |
| `--sdcd-alerte` | `#B57A0E` | `#8E5F08` | 3,65 → **5,54** |
| `--sdcd-erreur` | `#DB3832` | `#C42E29` | 4,02 → **4,93** *(sur fond pâle)* |
| `--sdcd-ligne-forte` | `#B9C2C9` | `#7E8992` | 1,81 → **3,57** |
| `--sdcd-ligne-forte` *(sombre)* | `#3D464E` | `#63707A` | 1,89 → **3,57** |

- **La teinte de marque `--sdcd-bleu #0095C9` est inchangée** : filet tricolore,
  armoiries et aplats de marque conservent exactement leur rendu. Elle ne porte
  désormais plus jamais de texte ni de contrôle.
- 11 usages de `var(--sdcd-bleu)` comme couleur d'interaction (bordure de champ
  au focus, survol de carte et de tuile, fond du `Toggle` actif) basculés sur
  `var(--sdcd-action)`.
- 6 `accentColor:'#0095C9'` codés en dur (`Checkbox`, `Radio`, `Range`,
  `DataTable`) basculés sur `var(--sdcd-action)`.

### Corrigé

- **Bouton primaire illisible en thème sombre.** Le texte était `#fff` codé en
  dur sur un aplat bleu clair, soit 2,28:1. Il suit désormais
  `--sdcd-sur-action` : 7,96:1. Corrigé dans `Button`, `IconButton`,
  `SearchBar`, `Pagination`, `Tag`, `Dropdown`, `MediaPlayer`, `Calendar`,
  `Rdv`, `ConnectButton`.
- **Infobulle illisible en thème sombre.** `Tooltip` posait `#fff` sur
  `--sdcd-encre`, qui s'éclaircit en sombre — 1,09:1. Suit désormais
  `--sdcd-sur-encre` : 16,58:1.
- **`ConnectButton` sans couleur de texte.** Le libellé « S'identifier avec »
  héritait du noir sur l'aplat bleu (3,87:1) et le sous-titre utilisait un blanc
  à 85 % d'opacité, cassé en thème sombre.
- **Panneau « Espace citoyen » du portail.** Le bloc portait `data-theme="dark"`
  *et* lisait `--sdcd-bleu-profond` pour son propre fond : la teinte basculait
  en bleu pâle sous son propre texte blanc, soit 1,48:1. Le fond utilise
  désormais `--sdcd-bleu-aplat`, invariant. Même correction sur `PanneauMarque`
  dans `ui_kits/modeles`.
- **Pastille du `Toggle`** figée en blanc, invisible sur la piste claire en
  thème sombre ; suit désormais le thème.

### Documentation

- `readme.md` — la doctrine « un seul bleu d'État » est remplacée par la
  distinction **teinte de marque / teinte d'interaction**, avec les ratios
  mesurés. Ajout d'un **contrat d'accessibilité** opposable : toute modification
  de `tokens/colors.css` qui le rompt est un défaut bloquant, et le
  vérificateur en fait foi.

### Connu, non traité dans cette version

- Pas de couche CSS pour les composants : styles en ligne dans les `.jsx`,
  inutilisables hors React.
- Fontes, icônes, React et Babel chargés depuis des CDN tiers ; `@babel/standalone`
  compile le JSX dans le navigateur, ce qui interdit un usage en production.
- Sélecteur de langue sans couche i18n : aucun contenu traduit.
- Contradiction `readme.md` ↔ `tokens/spacing.css` sur les rayons (2/4 px
  annoncés, 0 déclaré).
- 33 icônes `<i class="ri-…">` sans `aria-hidden`, 53 `<button>` sans `type`.
