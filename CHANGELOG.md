# Journal des modifications — SDCD

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/).
Versionnage : [SemVer](https://semver.org/lang/fr/). Un changement de valeur
d'un jeton de couleur est considéré comme **majeur** au-delà de la 1.0.0.

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
