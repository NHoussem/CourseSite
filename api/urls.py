from django.urls import path
from . import views

urlpatterns= [
    path('annonces/',views.getAnnonces,name='annonces'),
    path('teste/',views.AnnonceListView.as_view(),name='ApiView'),
    path('annonce/create/',views.createAnnonce,name='CreateAnnonce'),
    path('wilayas/',views.getWilaya,name='wilayas'),
    path('communes/',views.getCommune,name='Communes'),
    path('annonces/<str:pk>/',views.getAnnonce,name='Communes'),
    path('Adresses/',views.getLocalisations,name='adresses'),
    path('photo/<str:pk>/',views.getImages,name='AnnoncePhotos'),

    
]