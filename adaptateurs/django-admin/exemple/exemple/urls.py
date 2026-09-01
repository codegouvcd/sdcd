from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView

admin.site.site_header = "MINESURSI — Équivalences de diplômes"
admin.site.site_title = "MINESURSI"
admin.site.index_title = "Tableau de bord"

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False)),
    path("admin/", admin.site.urls),
]
