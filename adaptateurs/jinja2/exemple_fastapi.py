#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Exemple minimal : servir une page habillée par le SDCD depuis FastAPI.

    pip install fastapi uvicorn jinja2
    uvicorn exemple_fastapi:app --reload

Puis http://127.0.0.1:8000

Deux points suffisent à l'intégration :

  1. déclarer le dossier des macros dans le chargeur Jinja2 ;
  2. monter `dist/` du SDCD sur `/static/sdcd` — c'est ce chemin que les macros
     utilisent par défaut, redéfinissable par `sdcd_base`.
"""

import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

ICI = os.path.dirname(os.path.abspath(__file__))
SDCD = os.path.abspath(os.path.join(ICI, "..", ".."))

app = FastAPI(title="Exemple SDCD")

# Le dossier `dist/` du système, tel qu'il sort de `npm run build`.
app.mount("/static/sdcd", StaticFiles(directory=os.path.join(SDCD, "dist")), name="sdcd")

# Les macros vivent à côté de ce fichier ; on ajoute aussi un dossier
# `gabarits/` pour les pages de l'application.
gabarits = Jinja2Templates(directory=[ICI, os.path.join(ICI, "gabarits")])


PAGE = """{% import "sdcd.html" as sdcd %}
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{ titre }} — République Démocratique du Congo</title>
  {{ sdcd.css() }}
</head>
<body>
  {{ sdcd.liens_evitement(items=[{"lien": "#contenu", "libelle": "Aller au contenu"}]) }}
  {{ sdcd.filet_tricolore() }}

  <header class="sdcd-container sdcd-my-5">
    {{ sdcd.bloc_marque(entite="Ministère de l’Intérieur") }}
  </header>

  <main id="contenu" class="sdcd-container sdcd-my-6">
    {{ sdcd.fil_ariane(liens=[{"url": "/", "titre": "Démarches"}], courant=titre) }}
    <h1 class="sdcd-h1 sdcd-mt-5">{{ titre }}</h1>

    {{ sdcd.alerte(titre="Pièces manquantes",
                   type="alerte",
                   contenu="Votre dossier est incomplet.",
                   balise_titre="h2",
                   fermable=true) }}

    {{ sdcd.accordeon("pieces", "Quelles pièces fournir ?",
                      "<p>Une pièce d’identité et un justificatif de domicile.</p>") }}

    <form class="sdcd-flex-colonne sdcd-my-6" style="gap:var(--sdcd-5)" method="post">
      {{ sdcd.champ("courriel", "Adresse électronique", type="email",
                    aide="Format : nom@exemple.cd", requis=true) }}
      {{ sdcd.liste_deroulante("motif", "Motif de la demande", options=motifs) }}
      {{ sdcd.case_a_cocher("accord", "Je certifie l’exactitude des informations") }}
      {{ sdcd.bouton("Envoyer la demande", html_type="submit", icone="ri-send-plane-line") }}
    </form>

    {{ sdcd.pagination(page, 12, url="/?page=") }}
  </main>

  {{ sdcd.js() }}
</body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
def accueil(request: Request, page: int = 1):
    from jinja2 import Template

    # En production, préférez un fichier dans `gabarits/` et
    # `gabarits.TemplateResponse(...)`. Ici, la page est en ligne pour tenir
    # l'exemple en un seul fichier.
    modele = gabarits.env.from_string(PAGE)
    return HTMLResponse(modele.render(
        request=request,
        titre="Demande d’acte de naissance",
        page=page,
        motifs=[
            {"valeur": "", "libelle": "— Sélectionner —"},
            {"valeur": "naissance", "libelle": "Acte de naissance"},
            {"valeur": "mariage", "libelle": "Acte de mariage"},
        ],
    ))
