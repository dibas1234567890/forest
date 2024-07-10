from django.contrib import admin
from django.urls import include, path

from forest_pdf_app.views import anusuchi_14_view, dashboard_view

urlpatterns = [
    path('', anusuchi_14_view, name='anusuchi_form'),
    path('dashboard/', dashboard_view, name='dashboard')
]
