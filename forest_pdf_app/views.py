from django.shortcuts import get_object_or_404, render, HttpResponseRedirect
from django.urls import reverse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from forest_pdf_app.forms.anusuchi_form import AnusuchiForm
from forest_pdf_app.forms.details_form import DetailsForm
from forest_pdf_app.models import AnushuchiFourteen
from forest_pdf_app.serializers import AnusuchiSerializer
import requests

class FormDetail(APIView ):
    
    template_name = 'anusuchi_form.html'

    def get(self, request):
        anusuchi_form = AnusuchiForm
        details_form = DetailsForm
        return render(request, self.template_name, {'anusuchi_form':anusuchi_form, 'details_form': details_form})

    def post(self, request):
       
        serializer = AnusuchiSerializer( data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data) 
        return Response(serializer.data) 

        