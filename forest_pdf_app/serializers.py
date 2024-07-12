from rest_framework import serializers

from forest_pdf_app.models import AnushuchiFourteen, Details

class AnusuchiSerializer(serializers.ModelSerializer):
    class Meta: 
        model = AnushuchiFourteen
        fields = [ 'division_forest_office', 'division_forest_office_location',
                  'cha_no', 'date', 'applicant_name', 'sub_division_department', 'ghatgaddhi_place_name',
                  'lot_number', 'fiscal_year', 'notice_published_date', 'decision_date', 'bid_price',
                  'last_date_to_receive', 'measured_date', 'forest_department', 'truck_number', 'seal_number',
                  'days_to_pick_up', 'last_date_to_pick_up', 'cc_division_forest_office',
                  'cc_sub_division_forest_office', 'cc_finance_dept_division_forest_office', 'DFO_officer_signature']

class DetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Details
        fields = "__all__"
