import django_filters
from .models import Annonce
from .serializers import AnnonceSeria


class AnnonceFilter(django_filters.FilterSet):
    Wilaya=django_filters.CharFilter(field_name='Localisation__nomWilaya')
    Commune=django_filters.CharFilter(field_name='Localisation__NomCommune__NomCommune')
    class Meta:
        model=Annonce
        fields=['Titre','Description','Tarif','DatePublication','Categorie','ThemeAnn','Modalite','Wilaya','Commune']