"""Données fictives (celles du POC du SDCD) et un compte agent.

Le mot de passe du compte vient de l'environnement (DEMO_MOT_DE_PASSE) : rien
n'est écrit dans un fichier.

    DEMO_MOT_DE_PASSE=... python manage.py demo
"""

import os
from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError

from equivalences.models import Agent, Demande

AGENTS = [
    ("Jean-Baptiste Ilunga Mwepu", "Direction des services académiques"),
    ("Grâce Kabongo Mutombo", "Direction des services académiques"),
    ("Patrick Mavungu Nsimba", "Commission d’équivalence"),
]

DEMANDES = [
    ("MINESURSI/DSA/1602/02/0847/2026", "Grâce Mwilambwe Kalenga", "Haut-Katanga", "Master en génie civil", "Afrique du Sud", "verification", 118),
    ("MINESURSI/DSA/1602/02/0533/2026", "Divine Kahindo Masika", "Nord-Kivu", "Licence en sciences infirmières", "Ouganda", "pieces_manquantes", 131),
    ("MINESURSI/DSA/1602/02/0912/2026", "Patient Nsimba Lutete", "Kongo-Central", "Doctorat en médecine", "Angola", "a_instruire", 64),
    ("MINESURSI/DSA/1602/02/1004/2026", "Emmanuel Tshibangu Kazadi", "Kasaï", "Master en économie", "Belgique", "a_instruire", 12),
    ("MINESURSI/DSA/1602/02/0765/2026", "Sarah Bahati Furaha", "Sud-Kivu", "Licence en droit", "Rwanda", "commission", 97),
    ("MINESURSI/DSA/1602/02/0688/2026", "Christian Mbuyi Tshimanga", "Kinshasa", "Master en informatique", "France", "signature", 143),
    ("MINESURSI/DSA/1602/02/0451/2026", "Esther Nzuzi Mavungu", "Kongo-Central", "Licence en pharmacie", "Congo-Brazzaville", "verification", 88),
    ("MINESURSI/DSA/1602/02/0399/2026", "Josué Kambale Paluku", "Nord-Kivu", "Master en agronomie", "Kenya", "a_instruire", 151),
    ("MINESURSI/DSA/1602/02/0290/2026", "Rachel Ilunga Numbi", "Lualaba", "Licence en gestion", "Zambie", "commission", 105),
    ("MINESURSI/DSA/1602/02/0187/2026", "Trésor Bemba Lokonga", "Tshopo", "Master en santé publique", "Cameroun", "signature", 76),
    ("MINESURSI/DSA/1602/02/0154/2026", "Naomi Mwange Kabedi", "Ituri", "Licence en sciences de l’éducation", "Ouganda", "pieces_manquantes", 162),
    ("MINESURSI/DSA/1602/02/0102/2026", "Gédéon Kasongo Nyembo", "Haut-Katanga", "Master en géologie", "Afrique du Sud", "a_instruire", 33),
]


class Command(BaseCommand):
    help = "Cree les donnees de demonstration et le compte agent (mot de passe : DEMO_MOT_DE_PASSE)."

    def handle(self, *args, **options):
        mot_de_passe = os.environ.get("DEMO_MOT_DE_PASSE")
        if not mot_de_passe:
            raise CommandError("Definissez DEMO_MOT_DE_PASSE dans l'environnement.")

        agents = {}
        for nom, service in AGENTS:
            agents[nom], _ = Agent.objects.get_or_create(nom=nom, defaults={"service": service})
        instructeurs = list(agents.values())

        aujourd_hui = date.today()
        crees = 0
        for i, (ref, requerant, province, diplome, pays, etat, anciennete) in enumerate(DEMANDES):
            _, cree = Demande.objects.get_or_create(
                reference=ref,
                defaults={
                    "requerant": requerant, "province": province, "diplome": diplome, "pays": pays,
                    "etat": etat, "deposee_le": aujourd_hui - timedelta(days=anciennete),
                    "instructeur": instructeurs[i % len(instructeurs)],
                },
            )
            crees += int(cree)

        Utilisateur = get_user_model()
        agent, cree = Utilisateur.objects.get_or_create(
            username="agent", defaults={"first_name": "Jean-Baptiste", "last_name": "Ilunga Mwepu",
                                        "is_staff": True, "is_superuser": True},
        )
        agent.set_password(mot_de_passe)
        agent.save()
        self.stdout.write(self.style.SUCCESS(f"{len(AGENTS)} agents, {crees} demandes creees, compte « agent » pret."))
