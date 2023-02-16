from helpers.models import TrackingModel
from django.conf import settings
import uuid
from django.contrib.auth.hashers import make_password
from .constants import *
from django.db import models
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.models import (
    PermissionsMixin, UserManager, AbstractBaseUser)
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import jwt
from datetime import datetime, timedelta


from django.conf import settings


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
    Titre=models.CharField(max_length=50)
    Description = models.TextField(max_length=500,null=True)
    Tarif = models.IntegerField()
    DatePublication=models.DateTimeField(auto_now_add=True)
    Categorie=models.CharField(max_length=20,choices=CATEGORIES)
    ThemeAnn=models.CharField(max_length=20,choices=THEMES)
    Modalite=models.CharField(max_length=20,choices=MODALITIES)
    # personne=models.ForeignKey(User,auto_created=True,on_delete=models.CASCADE)
    Localisation=models.ForeignKey(Adresse,on_delete=models.CASCADE,related_name='AnnonceLoca')
    def getIdAnnonce(self):
        return self.idAnnonce

class Photo(models.Model):
    idPhoto=models.UUIDField(default=uuid.uuid4,editable=False)
    # path=models.FilePathField()
    image=models.ImageField(upload_to="images/")
    print(image)
    annonce=models.ForeignKey(Annonce,on_delete=models.CASCADE)
    def getAnnonceId(self):
        return self.annonce.getIdAnnonce()



class MyUserManager(UserManager):

    def _create_user(self, username, email,phoneNumber,password,**extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')

        if not email:
            raise ValueError('The given email must be set')
        if not phoneNumber:
            raise ValueError('The given phoneNumber must be set')

        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email,phoneNumber=phoneNumber, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email,phoneNumber, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email,phoneNumber,password, **extra_fields)

    def create_superuser(self, username, email,phoneNumber,  password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email,phoneNumber,  password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.
    Username and password are required. Other fields are optional.
    """
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    email = models.EmailField(_('email address'), blank=False, unique=True)
    phoneNumber= models.CharField(max_length=10,unique=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    email_verified = models.BooleanField(
        _('email_verified'),
        default=False,
        help_text=_(
            'Designates whether this users email is verified. '

        ),
    )
    objects = MyUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phoneNumber','username']

    # @property
    # def token(self):
    #     token=jwt.encode(
    #         {'username': self.username, 'email': self.email,
    #             'exp': datetime.utcnow() + timedelta(hours=24)},
    #         settings.SECRET_KEY, algorithm='HS256')
    #     return token

