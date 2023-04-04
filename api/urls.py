from django.urls import include, path
from . import views
from django.contrib.auth import views as auth_views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns= [
    path('annonces/',views.getAnnonces,name='annonces'),
    path('teste/',views.AnnonceListView.as_view(),name='ApiView'),
    path('register/',views.RegisterApiView.as_view(),name='register'),
    path('user/',views.AuthUserAPIView.as_view(),name='user'),
    path('login/',views.LoginAPIView.as_view(),name='login'),
    path('annonce/create/',views.createAnnonce.as_view(),name='CreateAnnonce'),
    path('CreateCommune/',views.CreateCommune.as_view(),name='CreateCommune'),
    path('CreateWilaya/',views.CreateWilaya.as_view(),name='CreateWilaya'),
    path('wilayas/',views.getWilaya,name='wilayas'),
    path('communes/',views.getCommune,name='Communes'),
    path('annonces/<str:pk>/',views.getAnnonce,name='Communes'),
    path('Adresses/',views.getLocalisations,name='adresses'),
    path('photo/<str:pk>/',views.getImages,name='AnnoncePhotos'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('ChangePassword/',views.ChangePasswordView.as_view(), name='Chnage_Password'),
    path('updateUserInfo/',views.updateUser.as_view(), name='Update_usersinfo'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('reset_password/',views.forgetPasswordlink,name="ForgerpasswordLink"),
    path('reset_passwordChange/',views.forgetPassword,name="Forgetpassword")

    
]