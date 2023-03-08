from django.shortcuts import render
import django_filters
from rest_framework.response import Response
from rest_framework import filters,status,permissions
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView,GenericAPIView,UpdateAPIView
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.contrib import messages
import jwt,datetime
from api.filters import AnnonceFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated   


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['profile_pic']=user.profile_pic.url
        token['email']=user.email
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
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

class createAnnonce(APIView):
    permission_classes = []

    def post(self, request):
        data = request.data
        user_id=data.get('utilisateur_id')
        nomwil = data.get('nomWilaya')
        Nomcomm = data.get('NomCommune')
        Lieu=data.get('Lieu')
        NumLogement=data.get('NumLogement')
        imgs = data.get('images')
        print(imgs)
        user=get_object_or_404(User,id=user_id)
        print(user.username)
        # Get the corresponding Wilaya and Commune instances
        # wilaya = Wilaya.objects.filter(nomWilaya=nomwil)
        wilaya=Wilaya.objects.get_or_create(
            nomWilaya=nomwil
        )
        wilaya=get_object_or_404(Wilaya ,nomWilaya= nomwil)
        commune = Commune.objects.get_or_create(
            NomCommune=Nomcomm,
            nomWilaya=wilaya,
            )
        commune=get_object_or_404(Commune ,NomCommune= Nomcomm)
        bienImob=BienImmob.objects.get_or_create(
            Lieu=Lieu,
        )
        bienImob=get_object_or_404(BienImmob ,Lieu= Lieu)
        # Create a new Localisation instance
        localisation = Adresse.objects.create(
            nomWilaya=wilaya,
            NomCommune=commune,
            Immobilier=bienImob,
            # Add any other fields you need to populate
        )
        # Use the Localisation instance to create a new Annonce instance
        annonce = Annonce.objects.create(
            Localisation=localisation,
            Titre=data.get('Titre'),
            Description =data.get('Description'),
            Tarif = data.get('Tarif'),
            Categorie=data.get('Categorie'),
            ThemeAnn=data.get('ThemeAnn'),
            Modalite=data.get('Modalite'),
            personne=user,
            # Add any other fields you need to populate
        )
        annonceObjec=get_object_or_404(Annonce,idAnnonce=annonce.idAnnonce)
        for photo_file in request.FILES.getlist('photos'):
            photo = Photo.objects.create(
                image=photo_file,
                annonce=annonce,
            )
        # Return the serialized data for the new Annonce instance
        serializer = AnnonceSeria(annonce)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    # annonce = Annonce.objects.create(
    #     Titre=data['Titre'],
    #     Description=data['Description'],
    #     Tarif=data['Tarif'],
    #     Categorie=data['Categorie'],
    #     Modalite=data['Modalite'],
    #     Localisation=data['']
    # )
    # serializer=AnnonceSeria(annonce)
    # if serializer.is_valid():
    #     serializer.save()
    #     print(serializer)   
    # return Response(serializer.data)

class AuthUserAPIView(GenericAPIView):
    permission_classes=(permissions.IsAuthenticated,)
    def get(self,request):
        user=request.user
        serializer=RegisterSerializer(user)
        return Response({'user':serializer.data})

class RegisterApiView(GenericAPIView):
    authentication_classes = []
    serializer_class = RegisterSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            # token=MyTokenObtainPairSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        if User.objects.filter(username=request.data['username']).first():
           print('username taken')
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=request.data['email']).first():
            return Response(serializer.errors, 'email is taken')

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(GenericAPIView):
    authentication_classes = []
    serializer_class = LoginSerializer 
    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(username=email, password=password)
        if user is not None:
            print(user)
            serializer = self.serializer_class(user)
            token=MyTokenObtainPairSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)        
        return Response({'message': "Invalid credentials, try again"}, status=status.HTTP_401_UNAUTHORIZED)

class CreateCommune(APIView):
    def post(self,request):
        data=request.data
        Communes=[]
        for item in data:
            wilay=item['nomWilaya']
            nomCom=item['nomCommune']
            NomWilaya=get_object_or_404(Wilaya,nomWilaya=wilay)
            commune=Commune.objects.create(
                NomCommune=nomCom,
                nomWilaya=NomWilaya
            )
            serializer = CommuneSeria(commune)
            Communes.append(serializer.data)
        return Response(Communes,status=status.HTTP_201_CREATED)
class CreateWilaya(APIView):
    def post(self,request):
        data = request.data
        wilayas = []
        for item in data:
            wila = item['nomWilaya']
            wilaya = Wilaya.objects.create(nomWilaya=wila)
            serializer = WilayaSeria(wilaya)
            wilayas.append(serializer.data)

        return Response(wilayas, status=status.HTTP_201_CREATED)

class ChangePasswordView(UpdateAPIView):
    serializer_class=ChangePasswordSerializer
    models=User
    permission_classes=(IsAuthenticated,)
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
    def update(self,request,*args,**kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class updateUser(UpdateAPIView):
    serializer_class=UpdateProfileSerializer
    models=User
    permission_classes=(IsAuthenticated,)
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
    def update(self,request,*args,**kargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        data=request.data
        if serializer.is_valid():
            
            # usrname=data['username']
            # photo=request.FILES.getlist('profile_pic')
            # print(photo)
            usr=get_object_or_404(User,email=self.object)
            if(data['username']!=usr.username)
            # print(usr)
            # usr.username=usrname
            for photo_file in request.FILES.getlist('profile_pic'):
                usr.profile_pic=photo_file
            
            usr.save()
            response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'username updated successfully',
                    'data': []
                }
            return Response(response)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
    