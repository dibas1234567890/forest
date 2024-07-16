from typing import Any
from django.db import models
from djangonepal.models import * 
from jsignature.fields import JSignatureField
from django.contrib.auth.models import User  


# Create your models here.



class AnushuchiFourteen(models.Model):
    fy_choices = [
    ('70/71', '70/71'),
    ('71/72', '71/72'),
    ('72/73', '72/73'),
    ('73/74', '73/74'),
    ('74/75', '74/75'),
    ('75/76', '75/76'),
    ('76/77', '76/77'),
    ('77/78', '77/78'),
    ('78/79', '78/79'),
    ('79/80', '79/80'),
    ('80/81', '80/81'),
    ('81/82', '81/82'),
    ('82/83', '82/83'),
    ('83/84', '83/84'),
    ('84/85', '84/85'),
    ('85/86', '85/86'),
    ('86/87', '86/87'),
    ('87/88', '87/88'),
    ('88/89', '88/89'),
    ('89/90', '89/90'),
    ('90/91', '90/91'),
]


    minstry_name = models.CharField(max_length=128)
    division_forest_office = models.ForeignKey(District, on_delete=models.CASCADE)

    division_forest_office_location = models.CharField(max_length=128)
    cha_no = models.CharField(max_length=128)
    date = models.DateField(auto_now=False, auto_now_add=False)
    applicant_name = models.CharField(max_length=128)
    sub_division_department = models.CharField(max_length=128)
    ghatgaddhi_place_name = models.CharField(max_length=128)
    lot_number = models.CharField(max_length=128)
    fiscal_year = models.CharField(choices=fy_choices, max_length=128)
    notice_published_date = models.DateField(auto_now=False, auto_now_add=False)
    decision_date = models.DateField(auto_now=False, auto_now_add=False)
    bid_price = models.FloatField()
    last_date_to_receive = models.DateField( auto_now=False, auto_now_add=False)
    measured_date = models.DateField( auto_now=False, auto_now_add=False)
    forest_department = models.CharField( max_length=50)
    truck_number = models.CharField( max_length=50)
    seal_number  = models.CharField( max_length=50)
    days_to_pick_up = models.IntegerField()
    last_date_to_pick_up = models.DateField()
    cc_division_forest_office = models.CharField( max_length=50) 
    cc_sub_division_forest_office = models.CharField( max_length=50) 
    cc_finance_dept_division_forest_office = models.CharField( max_length=50) 
    DFO_officer_signature = models.TextField(null=True, blank=True)

    user = models.ForeignKey(User,  on_delete=models.CASCADE)


    def __str__(self) -> str:
        return f"{self.cha_no}"
    

    
   

class Details(models.Model):
    wood_species = models.CharField(max_length=50)
    quantity = models.CharField(max_length=50)
    dimension = models.CharField(max_length=50)
    total_amount = models.FloatField()
    stamp_टाँचा_description = models.CharField(max_length=128)
    seal_description = models.CharField(max_length=128)
    remarks = models.CharField(max_length=128)
    anusuchi_cha_no = models.ForeignKey(AnushuchiFourteen, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self) -> str:
        return (
            f"{self.wood_species}, "
            f" {self.quantity}, "
            f" {self.dimension}, "
            f" {self.total_amount}, "
            f"{self.stamp_टाँचा_description}, "
            f" {self.seal_description}, "
            f"{self.remarks}"
        )
