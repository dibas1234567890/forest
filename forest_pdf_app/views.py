from django.http import HttpResponseRedirect
from django.shortcuts import render

from forest_pdf_app.forms.anusuchi_form import AnusuchiForm
from forest_pdf_app.forms.details_form import DetailsForm

# Create your views here.
def anusuchi_14_view(request):
    
    anusuchi_form = AnusuchiForm()
    details_form = DetailsForm()

    if anusuchi_form.is_valid():
        anusuchi_form.save()
        return HttpResponseRedirect('dashboard.html')
    else:
         
        return render(request, 'anusuchi_form.html', context={'details_form':details_form, 'anusuchi_form':anusuchi_form} )
    
    return render(request, 'anusuchi_form.html', context={'form':anusuchi_form} )

def dashboard_view(request):
    pass
