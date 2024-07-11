from django.contrib import admin
from django.urls import include, path
#from django.conf.urls import url
from forest_pdf_app.views import FormDetail 

urlpatterns = [
    path('form', FormDetail.as_view(), name='anusuchi_form'),
    #path('dashboard/', FormDetail.dashboard_view, name='dashboard')
]
