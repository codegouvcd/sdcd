# Ressources tierces

Le SDCD redistribue les ressources suivantes. Leurs licences respectives
s'appliquent et doivent être conservées avec toute copie.

## Iconographie

- **Remix Icon** v4 — Apache License 2.0 — <https://remixicon.com>
  Fichier redistribué : `assets/fontes/remixicon.woff2`, déclaré par
  `assets/icones.css`.

## Fontes

- **Inter** — SIL Open Font License 1.1 — <https://rsms.me/inter/>
- **Noto Sans Mono** — SIL Open Font License 1.1 — <https://fonts.google.com/noto>

Les fichiers `.woff2` correspondants sont redistribués dans `assets/fontes/`,
en sous-ensembles latin et latin étendu, et déclarés par `assets/fonts.css`.

> La licence OFL autorise cette redistribution. Elle interdit en revanche de
> vendre les fontes seules et impose de conserver la présente mention.

Ces fontes sont **auto-hébergées à dessein** : le système ne doit émettre aucune
requête vers un tiers, ce que `outils/construire.mjs` vérifie à chaque
construction.

## Dépendances de développement

- **React** — licence MIT — employé par les gabarits de démonstration
  (`components/`, `ui_kits/`) uniquement. La distribution `dist/` n'en dépend
  pas : elle est en CSS et JavaScript sans dépendance.
- **Playwright** — licence Apache 2.0 — employé par les vérificateurs
  (`outils/verifier-visuel.mjs`, `outils/auditer.mjs`,
  `outils/verifier-grille.mjs`), jamais livré.
