# Back-office MINESURSI — POC du SDCD
Maquette fonctionnelle d'un back-office d'administration publique (traitement des demandes d'équivalence de diplômes), démontrant la couverture du SDCD sans aucun style en dur : tout passe par les composants et les jetons (var(--sdcd-*)).

## Coquille (identique sur tous les écrans)
Lien d'évitement · filet tricolore · en-tête (BlocMarque MINESURSI, recherche globale, 6 langues, notifications à compteur, menu du compte agent avec rôle et service) · menu latéral repliable groupé par domaine avec compteurs · fil d'Ariane · zone de contenu (titre, sous-titre, barre d'actions) · pied de page institutionnel.

## Écrans
1. **Tableau de bord agent** — livré : 4 tuiles d'indicateurs avec tendance (1 en alerte, 1 en progression), alerte fermable, « Mes dossiers à traiter » (5 lignes, ancienneté J+n, retard signalé), file de signature à compteur, dépôts sur 12 mois, répartition par état, chronologie des 6 derniers événements.
2. **Liste des demandes** — filtres repliables, tags actifs supprimables, tableau avancé (tri par ancienneté décroissante, filtre, pagination, export CSV).
3. **Détail d'une demande** (« Pièces à vérifier ») — circuit 8 étapes, 6 onglets, pièces avec conformité, règle de substitution en exergue, acteurs et délais, commentaires, modale de rejet à motif obligatoire.
4. **Enregistrement** (bouton « Enregistrer une demande ») — 5 étapes verticales, tous les champs de saisie, résumé d'erreurs ancré, récapitulatif avec « Modifier », accusé AR-2026-01931.
5. **Parapheur** (« File de signature ») — deux panneaux, priorités, délégation de signature, modale de confirmation, progression du lot, historique, certificat.
6. **Référentiels** — onglets verticaux, règles avec interrupteurs, avertissement de modification en production, transitions en accordéon.
7. **Agents et habilitations** — annuaire (1 suspendu), matrice des droits, rôles en tags, invitation par modale.
8. **Statistiques** — périodes prédéfinies, 6 indicateurs comparés, délais par étape, provinces, entonnoir, micro-barres, fraîcheur des données.
9. **Journal d'audit** — chronologie par jour horodatée à la seconde (IP + empreinte), filtres, différentiel avant/après, chargement progressif, export scellé.
10. **Connexion** (« Se déconnecter » du compte) — coquille réduite, CongoConnect Agents, échec d'authentification, encart d'usage réservé.
11. **Pages système** (menu Système) — 404, 403 avec marche à suivre, 500, maintenance, session expirée, recherche globale + état vide.
12. **Galerie du SDCD** (menu Système) — sommaire ancré, fondations depuis les jetons, chaque famille avec sa règle d'usage, couverture d'accessibilité.

## Composants utilisés (écran 1)
SkipLink, BlocMarque, SearchBar, LangMenu, IconButton, Badge, Sidemenu, Breadcrumb, Button, Dropdown, Alert, Table, BarChart, DonutChart, Loader, Footer.

## Manques constatés dans le SDCD
- **Tuile d'indicateur (StatCard)** avec valeur + tendance : composée ici à partir de jetons ; mériterait un composant dédié.
- **En-tête connecté / back-office** (recherche + notifications + compte agent) : composé à partir de BlocMarque/SearchBar/LangMenu/IconButton ; variante du Header à créer.
- **Chronologie générique (Timeline)** : Tracking est spécialisé « suivi de dossier » ; la chronologie d'événements est composée à la main.
- **Compteurs dans Sidemenu** : portés par le libellé (« Mes dossiers (23) »), pas par une prop dédiée.
- **Avatar textuel**, **notification transitoire (toast)**, **squelette de chargement**, **liste de définition** : absents, à prévoir pour les écrans suivants.