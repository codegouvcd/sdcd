# Adaptateurs

Le SDCD est d'abord du **CSS et un script**, sans dépendance : n'importe quelle
pile peut le consommer en chargeant deux fichiers. Les adaptateurs ci-dessous
ne font qu'épargner la réécriture du balisage.

Les noms de composants et de paramètres sont **les mêmes dans les quatre
piles** : un `alerte(titre=…, type=…, contenu=…)` s'écrit pareil partout.

## HTML pur — aucun adaptateur

```html
<link rel="stylesheet" href="/sdcd/sdcd.min.css">
<script src="/sdcd/sdcd.js" defer></script>
```

C'est tout. `exemples/comportements.html` montre chaque composant manipulable
sans autre outillage.

## Django

Application `sdcd/`, livrée dans
[`codegouvcd/sites-conformes`](https://github.com/codegouvcd/sites-conformes).
**40 tags**, parité entière avec `django-dsfr`, plus un alias `dsfr/` qui permet
de remplacer ce dernier sans toucher aux gabarits existants.

```django
{% load sdcd_tags %}
{% sdcd_css %}
{% sdcd_alert titre="Attention" type="alerte" content="Dossier incomplet." %}
{% sdcd_js %}
```

## FastAPI, Flask, Starlette — macros Jinja2

`adaptateurs/jinja2/sdcd.html` — **31 macros**.

```python
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app.mount("/static/sdcd", StaticFiles(directory="chemin/vers/sdcd/dist"))
gabarits = Jinja2Templates(directory=["chemin/vers/sdcd/adaptateurs/jinja2", "gabarits"])
```

```jinja
{% import "sdcd.html" as sdcd %}
{{ sdcd.css() }}
{{ sdcd.alerte(titre="Attention", type="alerte", contenu="Dossier incomplet.") }}
{{ sdcd.js() }}
```

La racine des fichiers statiques vaut `/static/sdcd` par défaut ; pour la
changer : `{% set sdcd_base = "/assets/sdcd" %}`.

Exemple complet : `adaptateurs/jinja2/exemple_fastapi.py`.
Vérification : `python adaptateurs/jinja2/verifier.py`.

## WordPress — thème

`adaptateurs/wordpress/sdcd/` — thème autonome, la distribution est embarquée
dans `assets/sdcd/`. Copier le dossier dans `wp-content/themes/` et l'activer.

```php
<?php sdcd_alerte_e( array(
    'titre'   => 'Attention',
    'type'    => 'alerte',
    'contenu' => 'Dossier incomplet.',
) ); ?>
```

Chaque composant existe en deux formes : `sdcd_x()` renvoie le balisage,
`sdcd_x_e()` l'affiche. Les entrées sont échappées ; les paramètres acceptant
du HTML passent par `wp_kses_post()`.

Deux emplacements de menu sont déclarés : `principal` et `pied`.

Vérification : `php adaptateurs/wordpress/verifier.php`.

## État de vérification

| Adaptateur | Contrôle | Résultat |
|---|---|---|
| Jinja2 | 31 macros rendues | 98 classes émises, **0 manquante**, 0 fuite `fr-*` |
| Jinja2 | page FastAPI complète, en navigateur | 43 classes, **0 échec de contraste** sur 29 nœuds |
| WordPress | 7 fichiers PHP au lint | aucune erreur de syntaxe |
| WordPress | 9 composants rendus hors WordPress | 38 classes émises, **0 manquante** |
| HTML pur | 14 comportements manipulés en navigateur | tous réagissent |

## Ce qui n'est pas vérifié

Le thème WordPress **n'a jamais tourné dans un WordPress réel** : les
composants sont rendus avec les fonctions du CMS simulées. Cela attrape les
erreurs de syntaxe, de nommage et de balisage, pas les surprises d'intégration
— comportement des menus, échappement en conditions réelles, interaction avec
les extensions.

Aucun test de non-régression visuelle sur aucune des piles.
