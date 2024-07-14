from django.http import JsonResponse
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
from forest_pdf_app.serializers import AnusuchiSerializer, DetailSerializer, LoginSerializer, UserSerializer
import requests
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

        
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication 
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate




@ensure_csrf_cookie
def csrf_token_view(request):
    print(request.META.get('CSRF_COOKIE'))
    return JsonResponse({'csrfToken': request.META.get('CSRF_COOKIE')})


class AnusuchiView(APIView ):

    template_name = 'anusuchi_form.html'

    def get(self, request):
        form = AnusuchiForm
        print("id" +str(self.request.user.username))

        anusuchi_data = AnushuchiFourteen.objects.filter(user=request.user.id)
        serializer = AnusuchiSerializer(anusuchi_data, many =True,  context={'request': request} )

        return render(request, 'anusuchi_form.html', {'anusuchi_form': form})


    def post(self, request):
       
        serializer = AnusuchiSerializer( data=request.data, context={'request': request} )
        print(request.user.id)
        if serializer.is_valid(raise_exception=True):
            print('is valid')
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED) 
        return Response(serializer.data) 

class DetailView(APIView):
    template_name = 'detail_form.html'

   
    def get(self,request):
        # detail_form = DetailsForm()
        detail_data = Details.objects.filter(anusuchi_cha_no__user=request.user.id)
        print("id" +str(self.request.user.username))
        serializer = DetailSerializer(detail_data, many =True,  context={'request': request} )

        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        serializer = DetailSerializer( data=request.data)
        if serializer.is_valid(raise_exception=True):
            print('serializer saved')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.data) 
    
class UserCreate(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user: 
                return Response(serializer.data)
            
class UserLogin(APIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = LoginSerializer

    @csrf_exempt
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print('Serializer is valid')
            username = serializer.data['username']
            password = serializer.data['password']
            print(f'user: {username}')

            user = authenticate(username=username, password=password)
            print(user)
            if user:
                token, create = Token.objects.get_or_create(user=user)
                return Response({'token': [token.key], "Sucsses":"Login SucssesFully"}, status=status.HTTP_201_CREATED )
            else:
                print('Authentication failed')
                return Response({'Message': 'Invalid Username and Password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            print('Serializer is not valid')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DashBoardView(APIView):
    def get(self,request):
        detail_data = Details.objects.filter(anusuchi_cha_no__user=request.user.id)
        print("id" +str(self.request.user.username))
        serializer = DetailSerializer(detail_data, many =True,  context={'request': request} )
        return Response(serializer.data)


