from django.shortcuts import get_object_or_404, render, HttpResponseRedirect
from django.urls import reverse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView
from forest_pdf_app.forms.anusuchi_form import AnusuchiForm
from forest_pdf_app.forms.details_form import DetailsForm
from forest_pdf_app.models import AnushuchiFourteen, Details
from forest_pdf_app.serializers import AnusuchiSerializer, DetailSerializer
import requests

class AnusuchiView(APIView ):
    
    template_name = 'anusuchi_form.html'

    def get(self, request):
        anusuchi_data = AnushuchiFourteen.objects.filter(user=request.user.id)
        serializer = AnusuchiSerializer(anusuchi_data, many =True,  context={'request': request} )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
       
        serializer = AnusuchiSerializer( data=request.data)
        if serializer.is_valid(raise_exception=True) and self.request.user:
            print('is valid')
            serializer.save(user = self.request.user)
            return Response(serializer.data) 
        return Response(serializer.data) 

class DetailView(APIView):
    template_name = 'detail_form.html'

    def get(self,request):
        # detail_form = DetailsForm()
        detail_data = Details.objects.all()
        serializer = DetailSerializer(detail_data, many =True,  context={'request': request} )

        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = DetailSerializer( data=request.data)
        if serializer.is_valid(raise_exception=True):
            print('serializer saved')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.data) 

        