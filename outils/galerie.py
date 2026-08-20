#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Engendre `outils/galerie.html` : une page contenant chaque composant du système.

Sert de sujet aux tests de non-régression visuelle. La page est générée depuis
les macros Jinja2 plutôt qu'écrite à la main : elle reste ainsi synchrone avec
l'adaptateur, et un composant ajouté aux macros entre automatiquement dans le
périmètre testé.

Usage : python outils/galerie.py
"""

import io
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

from jinja2 import Environment, FileSystemLoader  # noqa: E402

RACINE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
MACROS = os.path.join(RACINE, "adaptateurs", "jinja2")

env = Environment(loader=FileSystemLoader(MACROS), autoescape=True)
m = env.get_template("sdcd.html").module

# Chaque entrée : identifiant stable, titre, balisage.
# L'identifiant sert de clé dans la référence : le renommer casse la comparaison.
BLOCS = [
    ("filet", "Filet tricolore", m.filet_tricolore()),
    ("blocmarque", "Bloc-marque", m.bloc_marque(entite="Ministère de l’Intérieur")),
    ("connect", "CongoConnect", m.congoconnect()),
    ("alerte-info", "Alerte — information", m.alerte(titre="Information", type="info", contenu="Texte.")),
    ("alerte-succes", "Alerte — succès", m.alerte(titre="Succès", type="succes", contenu="Texte.")),
    ("alerte-alerte", "Alerte — avertissement", m.alerte(titre="Attention", type="alerte", contenu="Texte.")),
    ("alerte-erreur", "Alerte — erreur", m.alerte(titre="Erreur", type="erreur", contenu="Texte.", fermable=True)),
    ("bandeau", "Bandeau", m.bandeau(titre="Information", description="Détail", lien="/x")),
    ("bouton-primaire", "Bouton primaire", m.bouton("Envoyer", type="primaire", icone="ri-send-plane-line")),
    ("bouton-secondaire", "Bouton secondaire", m.bouton("Annuler", type="secondaire")),
    ("bouton-tertiaire", "Bouton tertiaire", m.bouton("En savoir plus", type="tertiaire")),
    ("bouton-sm", "Bouton compact", m.bouton("Compact", taille="sm")),
    ("lien", "Lien externe", m.lien("/u", "Consulter le texte", externe=True)),
    ("carte", "Carte", m.carte("Demander un passeport", description="Ministère de l’Intérieur",
                               lien_url="/d", sur_titre="Démarche")),
    ("tuile", "Tuile", m.tuile("Acte de naissance", url="/p", description="État civil",
                               icone="ri-file-user-line")),
    ("citation", "Citation", m.citation("Justice, paix, travail.", auteur="Devise nationale",
                                        source="Constitution")),
    ("exergue", "Exergue", m.exergue("Texte mis en exergue.")),
    ("miseenavant", "Mise en avant", m.mise_en_avant(titre="À noter", texte="Contenu de la mise en avant.",
                                                     icone="ri-information-line")),
    ("etiquette", "Étiquette", m.etiquette("État civil")),
    ("etiquette-active", "Étiquette sélectionnée", m.etiquette("Passeport", selectionnable=True, selectionne=True)),
    ("badge", "Badge", m.badge("Nouveau", type="succes")),
    ("filariane", "Fil d’Ariane", m.fil_ariane(liens=[{"url": "/a", "titre": "Démarches"}], courant="État civil")),
    ("evitement", "Liens d’évitement", m.liens_evitement(items=[{"lien": "#contenu", "libelle": "Aller au contenu"}])),
    ("pagination", "Pagination", m.pagination(3, 12)),
    ("sommaire", "Sommaire", m.sommaire(items=[{"lien": "#a", "libelle": "Première section"},
                                               {"lien": "#b", "libelle": "Deuxième section"}])),
    ("menulateral", "Menu latéral", m.menu_lateral(titre="Rubriques",
                                                   items=[{"lien": "/a", "libelle": "Démarches"},
                                                          {"lien": "/b", "libelle": "Actualités"}],
                                                   chemin_actif="/a")),
    ("accordeon", "Accordéon", m.accordeon("g-acc", "Quelles pièces fournir ?",
                                           "<p>Une pièce d’identité.</p>")),
    ("onglets", "Onglets", m.onglets(items=[{"id": "g-o1", "titre": "Démarche", "contenu": "<p>Un.</p>"},
                                            {"id": "g-o2", "titre": "Pièces", "contenu": "<p>Deux.</p>"}])),
    ("interrupteur", "Interrupteur", m.interrupteur("g-t", "Notifications par SMS", actif=True)),
    ("interrupteur-off", "Interrupteur éteint", m.interrupteur("g-t2", "Notifications par courriel")),
    ("infobulle", "Infobulle", m.infobulle("Aide", "Explication complémentaire.")),
    ("choixtheme", "Choix du thème", m.choix_theme()),
    ("champ", "Champ de saisie", m.champ("courriel", "Adresse électronique", type="email",
                                         aide="Format : nom@exemple.cd", requis=True)),
    ("champ-erreur", "Champ en erreur", m.champ("nom", "Nom", erreur="Ce champ est requis.")),
    ("select", "Liste déroulante", m.liste_deroulante("motif", "Motif",
                                                      options=[{"valeur": "a", "libelle": "Naissance"}])),
    ("case", "Case à cocher", m.case_a_cocher("accord", "Je certifie l’exactitude", cochee=True)),
]

CORPS = "\n".join(
    '<section class="galerie__bloc" data-composant="%s">\n'
    '  <h2 class="galerie__titre">%s</h2>\n'
    '  <div class="galerie__sujet">%s</div>\n'
    '</section>' % (cle, titre, html)
    for cle, titre, html in BLOCS
)

PAGE = """<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SDCD — galerie de référence</title>
<link rel="stylesheet" href="../dist/sdcd.min.css">
<style>
  body { max-width: 940px; margin: 0 auto; padding: var(--sdcd-6) var(--sdcd-gouttiere); }
  .galerie__bloc { margin-block: var(--sdcd-6); }
  .galerie__titre { font-size: var(--sdcd-sm); text-transform: uppercase;
    letter-spacing: .08em; color: var(--sdcd-muet); border-bottom: 1px solid var(--sdcd-ligne);
    padding-bottom: var(--sdcd-2); margin-bottom: var(--sdcd-4); }
</style>
</head>
<body>
<h1 class="sdcd-h1">Galerie de référence</h1>
<p class="sdcd-texte-muet">Page engendrée par <code>outils/galerie.py</code>.
Elle sert de sujet aux tests de non-régression : ne pas la modifier à la main.</p>
%s
<script src="../dist/sdcd.js"></script>
</body>
</html>
""" % CORPS

chemin = os.path.join(RACINE, "outils", "galerie.html")
io.open(chemin, "w", encoding="utf-8", newline="\n").write(PAGE)
print("galerie.html : %d composants, %d caracteres" % (len(BLOCS), len(PAGE)))
