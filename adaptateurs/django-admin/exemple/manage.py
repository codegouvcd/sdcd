#!/usr/bin/env python
"""Projet d'exemple : l'administration Django habillée par le SDCD.

    python manage.py migrate
    python manage.py demo            # données fictives + compte agent
    python manage.py runserver 8010
"""
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "exemple.settings")
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
