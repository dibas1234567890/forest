from django import forms
from jsignature.forms import JSignatureField
from jsignature.widgets import JSignatureWidget
from forest_pdf_app.models import AnushuchiFourteen

class AnusuchiForm(forms.ModelForm):
    DFO_officer_signature = JSignatureField(widget=JSignatureWidget(jsignature_attrs={"color":"#000"}))
    date = forms.DateField(required=False, widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )
    notice_published_date  =  forms.DateField(required=False, widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )
    
    decision_date = forms.DateField(required=False, widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )
    last_date_to_receive = forms.DateField(required=False, widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )

    measured_date = forms.DateField(required=False, widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )
    last_date_to_pick_up =     forms.DateField(required=False, widget=forms.DateInput(format="%Y-%m-%d", attrs={"type": "date"}),
        input_formats=["%Y-%m-%d"]
    )



    class Meta:
        model = AnushuchiFourteen
        fields = [ 'division_forest_office', 'division_forest_office_location',
                  'cha_no', 'date', 'applicant_name', 'sub_division_department', 'ghatgaddhi_place_name',
                  'lot_number', 'fiscal_year', 'notice_published_date', 'decision_date', 'bid_price',
                  'last_date_to_receive', 'measured_date', 'forest_department', 'truck_number', 'seal_number',
                  'days_to_pick_up', 'last_date_to_pick_up', 'cc_division_forest_office',
                  'cc_sub_division_forest_office', 'cc_finance_dept_division_forest_office', 'DFO_officer_signature', ]
