from django.contrib import admin

from .models import Agent, Demande


@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ("nom", "service", "actif")
    list_filter = ("service", "actif")
    search_fields = ("nom",)


@admin.register(Demande)
class DemandeAdmin(admin.ModelAdmin):
    list_display = ("reference", "requerant", "province", "etat", "deposee_le", "instructeur")
    list_filter = ("etat", "province", "instructeur")
    search_fields = ("reference", "requerant", "diplome")
    date_hierarchy = "deposee_le"
    list_per_page = 10
    fieldsets = (
        ("Requérant", {"fields": ("reference", "requerant", "province")}),
        ("Diplôme", {"fields": ("diplome", "pays")}),
        ("Instruction", {"fields": ("etat", "deposee_le", "instructeur", "montant_usd", "observations")}),
    )
