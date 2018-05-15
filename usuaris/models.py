from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.

class Usuari (models.Model):
    #continguts extras que volem
    admin=models.BooleanField(default=False)
    direccio=models.CharField(max_length=200,)
    monedes = models.IntegerField(default = 100)
    # 1 to 1 - model User
    usuari = models.OneToOneField( User )
    image = models.ImageField(upload_to='usuaris',
                              blank=True)


def post_save_user(sender, instance, created, **kwargs):
    if created:
        nou_usuari = Usuari.objects.create(
                    usuari=instance,
                    )
        instance.refresh_from_db()

post_save.connect(post_save_user, sender=User)