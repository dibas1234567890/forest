from django.contrib import admin
from django.urls import include, path
#from django.conf.urls import url
from forest_pdf_app.views import AnusuchiView, DetailView 

urlpatterns = [
    path('anusuchi_form', AnusuchiView.as_view(), name='anusuchi_form'),
    path('detail_form', DetailView.as_view(), name='detail_form'),
    #path('dashboard/', FormDetail.dashboard_view, name='dashboard')
]
