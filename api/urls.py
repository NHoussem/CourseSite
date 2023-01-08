from django.urls import path
from . import views

urlpatterns= [
    path('annonces/',views.getAnnonces,name='annonces'),
    path('wilayas/',views.getWilaya,name='wilayas'),
    path('communes/',views.getCommune,name='Communes'),
    path('annonces/<str:pk>/',views.getAnnonce,name='Communes'),
    path('Adresses/',views.getLocalisations,name='adresses'),
]