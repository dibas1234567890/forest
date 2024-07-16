from django.http import FileResponse, JsonResponse
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
from fillpdf import fillpdfs


from django.views import View


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


class PdfView(APIView): 
    def get(self, request):
        path = "Anusuchi14.pdf"
        form_fields = list(fillpdfs.get_form_fields(path))
        print(form_fields)

        detail_instance = Details.objects.filter(anusuchi_cha_no__user=request.user.id).first()
        anusuchi_related_id =  detail_instance.anusuchi_cha_no
        model_instance = AnushuchiFourteen.objects.get(pk=anusuchi_related_id.id)
        form_fields_mapping = {
    'Text-division_forest_office': model_instance.division_forest_office,
    'division_forest_office_location': model_instance.division_forest_office_location,
    'Text-cha_no': model_instance.cha_no,
    'Text-date': model_instance.date,
    'Paragraph-applicant_name': model_instance.applicant_name,
    'Text-sub_division_department-': model_instance.sub_division_department,
    'Text-ghatgaddhi_place_name': model_instance.ghatgaddhi_place_name,
    'Text-lot_number': model_instance.lot_number,
    'Text-fiscal_year': model_instance.fiscal_year,
    'Text-notice_published_date': model_instance.notice_published_date,
    'Text-decision_date': model_instance.decision_date,
    'Text-bid_price': model_instance.bid_price,
    'Text-last_date_to_receive': model_instance.last_date_to_receive,
    'Text-measured_date': model_instance.measured_date,
    'Text-forest_department': model_instance.forest_department,
    'Text-truck_number': model_instance.truck_number,
    'Text-seal_number': model_instance.seal_number,
    'Text-days_to_pick_up': model_instance.days_to_pick_up,
    'Text-last_date_to_pick_up': model_instance.last_date_to_pick_up,
    'Text-cc_division_forest_office': model_instance.cc_division_forest_office,
    'Text-cc_sub_division_forest_office': model_instance.cc_sub_division_forest_office,
    'Text-cc_finance_dept_division_forest_office': model_instance.cc_finance_dept_division_forest_office,
    'Signature-DFO_officer_signature': model_instance.DFO_officer_signature,
    'Paragraph-pC3l_tFD7A': None,  
    'Paragraph-detail_1': None,  
    'Paragraph-detail_2': None,  
    'Paragraph-detail_3': None,  
    'Paragraph-detail_4': None, 
    'Paragraph-detail_5': None,  
    'Paragraph-detail_6': None   
}
        
        export_pdf = fillpdfs.write_fillable_pdf(path,
                                                  "printable_form.pdf", data_dict= form_fields_mapping,flatten=True )

        
        file = open('printable_form.pdf', "rb")
        return FileResponse(file, as_attachment=True)

    