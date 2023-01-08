from rest_framework.serializers import ModelSerializer,ReadOnlyField
from .models import *

        
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
    nomWilaya=WilayaSeria(many=False,read_only=True)
    NomCommune=CommuneSeria(many=False,read_only=True)
    class Meta:
        model=Adresse
        fields=('__all__')
class AnnonceSeria(ModelSerializer):
    Localisation=LocaliSeria(many=False,read_only=True)
    class Meta:
        model=Annonce
        fields=('__all__')
