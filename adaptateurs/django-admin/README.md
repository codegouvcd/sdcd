# Thème SDCD pour l'administration Django

`sdcd_admin` habille `django.contrib.admin` avec le Système de design de l'État
congolais, sans réécrire l'admin : la coquille (lien d'évitement, filet
tricolore, en-tête avec armoiries, menu latéral, fil d'Ariane, contenu, pied) est
faite des composants du SDCD, et les couleurs, fontes et bordures des listes,
formulaires, boutons et messages de Django sont redéfinies par ses variables
CSS à partir des jetons `--sdcd-*`. Aucun style en dur.

C'est la version Django de la maquette `ui_kits/admin` (« Back-office
MINESURSI »), écran de connexion et tableau de bord compris.

## Installation

1. Copier `sdcd_admin/` dans votre projet (ou l'ajouter au `PYTHONPATH`).
2. Placer l'application **avant** `django.contrib.admin`, pour que ses gabarits
   `admin/*.html` recouvrent ceux de Django :

   ```python
   INSTALLED_APPS = [
       "sdcd_admin",
       "django.contrib.admin",
       # ...
   ]
   ```

3. Les fichiers statiques attendus sont dans `sdcd_admin/static/sdcd_admin/` :
   `sdcd.css` (la feuille construite du SDCD), `assets/fontes/`, `armoiries-rdc.png`,
   `sdcd-admin.css` et `sdcd-admin.js`. `npm run build` à la racine du dépôt les
   y recopie ; `collectstatic` fait le reste.
4. Le nom affiché dans l'en-tête est `admin.site.site_header`.

Rien d'autre à configurer. Les gabarits de liste, de formulaire et de
suppression de Django sont conservés tels quels ; seuls `base.html`,
`nav_sidebar.html`, `index.html` et `login.html` sont remplacés, avec les mêmes
noms de blocs.

## Essayer

Le dossier `exemple/` est un projet Django minimal avec le métier de la
maquette (demandes d'équivalence de diplômes, agents) :

```bash
cd adaptateurs/django-admin/exemple
python manage.py migrate
DEMO_MOT_DE_PASSE=choisissez-en-un python manage.py demo
python manage.py runserver 8010
```

Puis http://127.0.0.1:8010/admin/ avec le compte `agent`.

## Ce qui est couvert

- Connexion, tableau de bord (applications, actions récentes), listes (filtres,
  recherche, actions groupées, pagination, hiérarchie de dates), formulaires
  (sections, aides, erreurs), suppression, changement de mot de passe.
- Mobile : le menu latéral se replie (mémorisé par navigateur) et se superpose
  sous 900 px ; l'en-tête se réorganise.
- Thème sombre : `data-theme="dark"` sur `<html>`, comme partout dans le SDCD.

## Limites connues

- Les widgets JavaScript de Django (sélecteur double, calendrier, éditeur de
  relations) gardent leur mise en page ; ils sont recolorés, pas redessinés.
- Le sélecteur de thème clair/sombre de Django est retiré : le SDCD porte le
  sien.
