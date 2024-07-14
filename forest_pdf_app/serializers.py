from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework.permissions import AllowAny

from forest_pdf_app.models import AnushuchiFourteen, Details

class AnusuchiSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = AnushuchiFourteen
        fields = [ 'division_forest_office', 'division_forest_office_location',
                  'cha_no', 'date', 'applicant_name', 'sub_division_department', 'ghatgaddhi_place_name',
                  'lot_number', 'fiscal_year', 'notice_published_date', 'decision_date', 'bid_price',
                  'last_date_to_receive', 'measured_date', 'forest_department', 'truck_number', 'seal_number',
                  'days_to_pick_up', 'last_date_to_pick_up', 'cc_division_forest_office',
                  'cc_sub_division_forest_office', 'cc_finance_dept_division_forest_office', 'DFO_officer_signature', 'user']
        
        read_only_fields = ['user']

    def create(self, validated_data):
            user = self.context['request'].user
            anusuchi = AnushuchiFourteen.objects.create(user=user, **validated_data)
            return anusuchi
    

class DetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Details
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
        permission_classes = [AllowAny]
        

        email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
        username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
        password = serializers.CharField(min_length=8)

        def create(self, validated_data):
            user = User(**validated_data)
            user.set_password(validated_data['password'])
            user.save()
            return user

        class Meta:
            model = User
            fields = ('id', 'username', 'email', 'password')

class LoginSerializer(serializers.Serializer):
           username = serializers.CharField(required=True)
           password = serializers.CharField(required=True)
      

