Saisie d'un code à usage unique (OTP) : une case par chiffre, collage du code entier accepté, avancement et retour automatiques au clavier, `autocomplete="one-time-code"` pour le remplissage natif iOS/Android.

```jsx
<CodeOTP longueur={6} hint="Code envoyé par SMS au +243 81 234 56 78" onComplet={verifier} />
```

Règle SDCD : 6 chiffres, validité 5 minutes, un lien « Renvoyer le code » actif après 30 secondes.
