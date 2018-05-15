from __future__ import unicode_literals

from django.db import models
from usuaris.models import Usuari
from django.contrib.auth.models import User

# Create your models here.

class Joc(models.Model):
    nom = models.CharField(max_length=200)
    preuE = models.DecimalField(max_digits=7,decimal_places=2)
    preuG = models.IntegerField()
    imatge = models.ImageField(max_length=200, upload_to='jocs')
    descripcio = models.TextField(null=True, blank=True)


class Comprat(models.Model):
    usuari = models.ForeignKey(Usuari)
    joc = models.ForeignKey(Joc)
    completat = models.BooleanField(default=False)