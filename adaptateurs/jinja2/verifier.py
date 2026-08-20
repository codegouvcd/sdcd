#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Vérifie les macros Jinja2 du SDCD.

Trois contrôles :
  1. chaque macro rend sans erreur ;
  2. aucune ne laisse fuiter une classe `fr-*` ;
  3. toute classe `sdcd-*` émise existe dans les feuilles du système.

Usage : python adaptateurs/jinja2/verifier.py
"""

import io
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

from jinja2 import Environment, FileSystemLoader  # noqa: E402

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.abspath(os.path.join(ICI, "..", ".."))

env = Environment(loader=FileSystemLoader(ICI), autoescape=True)
macros = env.get_template("sdcd.html").module

# Chaque appel : nom, arguments positionnels, arguments nommés.
APPELS = [
    ("css", [], {}),
    ("js", [], {"nonce": "n0nce"}),
    ("filet_tricolore", [], {}),
    ("alerte", [], {"titre": "Attention", "type": "alerte", "contenu": "Dossier incomplet.", "fermable": True}),
    ("bandeau", [], {"titre": "Information", "description": "Détail", "lien": "/x", "fermable": True}),
    ("bouton", ["Envoyer"], {"type": "primaire", "icone": "ri-send-plane-line"}),
    ("lien", ["/u", "Consulter"], {"externe": True}),
    ("carte", ["Démarche"], {"description": "Texte", "lien_url": "/d", "sur_titre": "Service"}),
    ("tuile", ["Passeport"], {"url": "/p", "description": "Intérieur", "icone": "ri-passport-line"}),
    ("citation", ["Justice, paix, travail."], {"auteur": "Devise", "source": "Constitution"}),
    ("exergue", ["Texte en exergue"], {}),
    ("mise_en_avant", [], {"titre": "À noter", "texte": "Contenu", "icone": "ri-information-line"}),
    ("etiquette", ["État civil"], {"selectionnable": True, "selectionne": True}),
    ("badge", ["Nouveau"], {"type": "succes"}),
    ("fil_ariane", [], {"liens": [{"url": "/a", "titre": "Démarches"}], "courant": "État civil"}),
    ("liens_evitement", [], {"items": [{"lien": "#contenu", "libelle": "Aller au contenu"}]}),
    ("pagination", [3, 12], {}),
    ("sommaire", [], {"items": [{"lien": "#a", "libelle": "Section A"}]}),
    ("menu_lateral", [], {"titre": "Rubriques", "items": [{"lien": "/a", "libelle": "A"}], "chemin_actif": "/a"}),
    ("accordeon", ["acc1", "Quelles pièces ?", "<p>Une pièce d’identité.</p>"], {}),
    ("onglets", [], {"items": [{"id": "o1", "titre": "Un", "contenu": "<p>1</p>"},
                               {"id": "o2", "titre": "Deux", "contenu": "<p>2</p>"}]}),
    ("interrupteur", ["t1", "Notifications SMS"], {"actif": True, "aide": "Gratuit"}),
    ("infobulle", ["Aide", "Explication"], {}),
    ("modale", ["m1", "Confirmer", "<p>Contenu</p>"], {"actions": "<button class='sdcd-button'>OK</button>"}),
    ("choix_theme", [], {}),
    ("champ", ["courriel", "Adresse électronique"], {"type": "email", "aide": "nom@exemple.cd", "requis": True}),
    ("champ", ["nom", "Nom"], {"erreur": "Ce champ est requis."}),
    ("liste_deroulante", ["motif", "Motif"], {"options": [{"valeur": "a", "libelle": "Naissance"}], "selection": "a"}),
    ("case_a_cocher", ["accord", "Je certifie l’exactitude"], {"cochee": True}),
    ("bloc_marque", [], {"entite": "Ministère de l’Intérieur"}),
    ("congoconnect", [], {}),
]

# Classes définies par le système.
definies = set()
for f in ("components.css", "base.css", "utilitaires.css", "responsive.css"):
    chemin = os.path.join(RACINE, f)
    definies.update(re.findall(r"\.(sdcd-[a-zA-Z0-9_-]+)", io.open(chemin, encoding="utf-8").read()))

echecs = 0
emises = set()

print("Macros Jinja2 du SDCD\n" + "-" * 21)
for nom, args, kw in APPELS:
    macro = getattr(macros, nom, None)
    if macro is None:
        echecs += 1
        print("  ABSENTE  %s" % nom)
        continue
    try:
        html = str(macro(*args, **kw))
    except Exception as e:
        echecs += 1
        print("  ECHEC    %-18s %s: %s" % (nom, type(e).__name__, str(e)[:70]))
        continue
    classes = " ".join(re.findall(r'class="([^"]*)"', html)).split()
    fuites = [c for c in classes if c.startswith("fr-")]
    emises.update(c for c in classes if c.startswith("sdcd-"))
    if fuites:
        echecs += 1
        print("  FUITE    %-18s %s" % (nom, ", ".join(fuites[:3])))
    else:
        print("  ok       %-18s %4d car." % (nom, len(html)))

manquantes = sorted(emises - definies)
print("\nClasses sdcd-* emises : %d   manquantes : %d" % (len(emises), len(manquantes)))
for c in manquantes:
    print("  MANQUANTE %s" % c)
echecs += len(manquantes)

print("\n%s" % ("Aucun defaut." if echecs == 0 else "%d defaut(s)." % echecs))
raise SystemExit(1 if echecs else 0)
