from django.db import models
import uuid
from django.contrib.auth.models import User
from .constants import *



class Wilaya(models.Model):
    nomWilaya=models.CharField(max_length=25 ,primary_key=True,choices=WILAYAS)

    def __str__(self):
        return str(self.nomWilaya)

class Commune(models.Model):
    idCommune=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    NomCommune=models.CharField(max_length=20)
    nomWilaya=models.ForeignKey(Wilaya,on_delete=models.DO_NOTHING,related_name='CommuneDewila')
    
    def __str__(self):
        return self.NomCommune


class BienImmob(models.Model):
    NumRue=models.IntegerField()
    NomRue=models.CharField(max_length=100)
    NumLogement=models.CharField(max_length=100)
    class Meta:
        unique_together = (('NumRue', 'NomRue','NumLogement'),)

class Adresse(models.Model):
    idAdresse=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    nomWilaya=models.ForeignKey(Wilaya,on_delete=models.CASCADE,related_name='AdresseWilaya')
    NomCommune=models.ForeignKey(Commune,on_delete=models.CASCADE,related_name='AdresseCommune')
    Immobilier=models.ForeignKey(BienImmob,on_delete=models.CASCADE,related_name='AdresseBienImob')

    def getidCommune(self):
        return self.NomCommune.NomCommune

class Annonce(models.Model):
    idAnnonce=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    Titre=models.CharField(max_length=20)
    Description = models.TextField(max_length=500,null=True)
    Tarif = models.IntegerField()
    DatePublication=models.DateTimeField(auto_now_add=True)
    Categorie=models.CharField(max_length=20,choices=CATEGORIES)
    ThemeAnn=models.CharField(max_length=20,choices=THEMES)
    Modalite=models.CharField(max_length=20,choices=MODALITIES,default=2)
    # personne=models.ForeignKey(User,auto_created=True,on_delete=models.CASCADE)
    Localisation=models.ForeignKey(Adresse,on_delete=models.CASCADE,related_name='AnnonceLoca')
    def getadresse(self):
        return self.Description

class photo(models.Model):
    idPhoto=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    path=models.FilePathField()
    annonce=models.ForeignKey(Annonce,on_delete=models.CASCADE)

