from __future__ import unicode_literals

from django.db import models
from jocs.models import Joc
from django.contrib.auth.models import User

# Create your models here.

class Carret(models.Model):
    usuari = models.ForeignKey(User)
    preu_total = models.DecimalField(max_digits=7,decimal_places=2,  default=0)
    preuG_total = models.IntegerField(default=0)
    
class Comanda(models.Model):
    carro = models.ForeignKey(Carret)
    joc = models.ForeignKey(Joc, related_name='joc_agafat')
    preuE = models.DecimalField(max_digits=7,decimal_places=2)
    preuG = models.IntegerField()
    data = models.DateField(auto_now=True)