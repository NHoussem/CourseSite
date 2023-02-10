from rest_framework.serializers import ModelSerializer,ReadOnlyField
from .models import *
from .models import User
from rest_framework import serializers

        
class WilayaSeria(ModelSerializer):
    class Meta:
        model=Wilaya
        fields=('__all__')

class CommuneSeria(ModelSerializer):
    class Meta:
        model=Commune
        fields=('__all__')

class ImmobSeria(ModelSerializer):
    class Meta:
        model=BienImmob
        fields=('__all__')
class LocaliSeria(ModelSerializer):
    Immobilier=ImmobSeria(many=False,read_only=True)
    nomwilaya=WilayaSeria(source='nomWilaya')
    Nomcommune=CommuneSeria(source='NomCommune')
    class Meta:
        model=Adresse
        fields=('__all__')
class AnnonceSeria(ModelSerializer):
    Localisation=LocaliSeria(many=False,read_only=True)
    class Meta:
        model=Annonce
        fields=('__all__')
    def to_representation(self, instance):
        representation = dict()
        representation["id"] = instance.idAnnonce
        representation["Titre"] = instance.Titre
        representation["Description"] = instance.Description
        representation["Tarif"] = instance.Tarif
        representation["DatePublication"] = instance.DatePublication
        representation["Categorie"] = instance.Categorie
        representation["ThemeAnn"] = instance.ThemeAnn
        representation["Modalite"] = instance.Modalite
        representation["Wilaya"] = instance.Localisation.nomWilaya.nomWilaya
        representation["Commune"] = instance.Localisation.NomCommune.NomCommune
        representation["Immobilier"] =f'{"Numero Rue:"} {instance.Localisation.Immobilier.NumRue} {"Nom Rue:"}{instance.Localisation.Immobilier.NomRue} {instance.Localisation.Immobilier.NumLogement}'

        return representation

class photoSeria(ModelSerializer):
    Annonce=AnnonceSeria(many=False,read_only=True)
    class Meta:
        model=Photo
        fields=('__all__')
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email','telephone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance