from django.contrib import admin
from django.urls import include, path
#from django.conf.urls import url
from forest_pdf_app.views import AnusuchiView, DashBoardView, DetailView, PdfView, UserCreate, UserLogin, csrf_token_view 
from rest_framework_simplejwt import views as jwt_views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('anusuchi_form', AnusuchiView.as_view(), name='anusuchi_form'),
    path('detail_form', DetailView.as_view(), name='detail_form'),
    path('csrf_token', csrf_token_view, name=''),
    path('register', UserCreate.as_view(), name='account_create'),
    path('login', obtain_auth_token, name='user_login'),
    path('dashboard', DashBoardView.as_view(), name='dashboard'),
    path('pdf', PdfView.as_view(), name='pdf'),

    
       path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh')


]
#     
# 
# for future JWT AUTHENTICATION
# path('token/', 
#           jwt_views.TokenObtainPairView.as_view(), 
#           name ='token_obtain_pair'),
#      path('token/refresh/', 
#           jwt_views.TokenRefreshView.as_view(), 
#           name ='token_refresh')
#     #path('dashboard/', FormDetail.dashboard_view, name='dashboard')
# ]



