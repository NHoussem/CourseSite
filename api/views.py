from django.shortcuts import render
import django_filters
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.exceptions import AuthenticationFailed
from django.views.generic.list import ListView
from .serializers import UserSerializer
import jwt,datetime
from api.filters import AnnonceFilter
from django_filters.rest_framework import DjangoFilterBackend
# @api_view(['GET'])
# def getAdresse(request):
#     localisation=Adresse.objects.all()
#     serialiser=LocaliSeria(localisation,many=True)    
#     return Response(serialiser.data)
# @api_view(['GET'])
# def getRoutes(request):

#     routes = [
#         {
#             'Endpoint': 'annonces/create/',
#             'method': 'PUT',
#             'Titre': {'Titre': ""},
#             'Description' : {'Description': ""},
#             'Tarif': {'Tarif': ""},
#             'Categorie': {'Categorie': ""},
#             'Modalite': {'Modalite': ""},
#             'description': 'Creates new annonce with data sent in post request'
#         },
        
#     ]
#     return Response(routes)
class AnnonceListView(ListCreateAPIView):
    queryset=Annonce.objects.all()
    serializer_class=AnnonceSeria
    filter_backends={DjangoFilterBackend,filters.SearchFilter}
    filterset_class=AnnonceFilter
    search_fields=['Titre','Description','Tarif','DatePublication','Categorie','ThemeAnn','Modalite','Localisation__nomWilaya__nomWilaya','Localisation__NomCommune__NomCommune']
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
@api_view(['GET'])
def getWilaya(request):
    wilayas=Wilaya.objects.all()
    serialiser=WilayaSeria(wilayas,many=True)    
    return Response(serialiser.data)

@api_view(['GET'])
def getCommune(request):
    commune=Commune.objects.all()
    serialiser=CommuneSeria(commune,many=True)    
    return Response(serialiser.data)

@api_view(['GET'])
def getAnnonces(request):
    annonces=Annonce.objects.all()
    serialiser=AnnonceSeria(annonces,many=True)    
    return Response(serialiser.data)

@api_view(['GET'])
def getAnnonce(request,pk):
    annonce=Annonce.objects.get(idAnnonce=pk)
    serialiser=AnnonceSeria(annonce,many=False)    
    return Response(serialiser.data)

@api_view(['GET'])
def getLocalisations(request):
    adresse=Adresse.objects.all()
    serialiser=LocaliSeria(adresse,many=True)    
    return Response(serialiser.data)

@api_view(['GET'])
def getImages(request,pk):
    photo=Photo.objects.filter(annonce_id=pk)
    serialiser=photoSeria(photo,many=True)
    return Response(serialiser.data)


@api_view(['POST'])
def createAnnonce(request):
    data=request.data
    annonce = Annonce.objects.create(
        Titre=data['Titre'],
        Description=data['Description'],
        Tarif=data['Tarif'],
        Categorie=data['Categorie'],
        Modalite=data['Modalite'],
        Localisation=data['']
    )
    serializer=AnnonceSeria(annonce)
    if serializer.is_valid():
        serializer.save()
        print(serializer)   
    return Response(serializer.data)

