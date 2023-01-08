from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
# @api_view(['GET'])
# def getAdresse(request):
#     localisation=Adresse.objects.all()
#     serialiser=LocaliSeria(localisation,many=True)    
#     return Response(serialiser.data)
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


