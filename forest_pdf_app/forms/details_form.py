from django import forms


from forest_pdf_app.models import AnushuchiFourteen, Details 

class DetailsForm(forms.ModelForm):

    class Meta: 
        fields = "__all__"
        model = Details
