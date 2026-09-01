"""Le métier du POC « Back-office MINESURSI » du SDCD : des demandes
d'équivalence de diplômes, instruites par des agents."""

from django.db import models


class Agent(models.Model):
    nom = models.CharField("nom complet", max_length=120)
    service = models.CharField("service", max_length=120, default="Direction des services académiques")
    actif = models.BooleanField("actif", default=True)

    class Meta:
        verbose_name = "agent"
        verbose_name_plural = "agents"
        ordering = ["nom"]

    def __str__(self):
        return self.nom


class Demande(models.Model):
    class Etat(models.TextChoices):
        A_INSTRUIRE = "a_instruire", "À instruire"
        PIECES = "pieces_manquantes", "Pièces manquantes"
        VERIFICATION = "verification", "Vérification externe"
        COMMISSION = "commission", "Avis de la commission"
        SIGNATURE = "signature", "En signature"
        DECIDEE = "decidee", "Décidée"

    reference = models.CharField("référence", max_length=40, unique=True)
    requerant = models.CharField("requérant", max_length=120)
    province = models.CharField("province", max_length=60)
    diplome = models.CharField("diplôme", max_length=160)
    pays = models.CharField("pays d’obtention", max_length=80)
    etat = models.CharField("état", max_length=20, choices=Etat.choices, default=Etat.A_INSTRUIRE)
    deposee_le = models.DateField("déposée le")
    instructeur = models.ForeignKey(Agent, verbose_name="instructeur", null=True, blank=True, on_delete=models.SET_NULL)
    montant_usd = models.DecimalField("frais (USD)", max_digits=8, decimal_places=2, default=85)
    observations = models.TextField("observations", blank=True)

    class Meta:
        verbose_name = "demande d’équivalence"
        verbose_name_plural = "demandes d’équivalence"
        ordering = ["deposee_le"]

    def __str__(self):
        return f"{self.reference} — {self.requerant}"
