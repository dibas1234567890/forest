# Generated by Django 4.2.14 on 2024-07-11 15:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import jsignature.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('djangonepal', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AnushuchiFourteen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minstry_name', models.CharField(max_length=128)),
                ('division_forest_office_location', models.CharField(max_length=128)),
                ('cha_no', models.CharField(max_length=128)),
                ('date', models.DateField()),
                ('applicant_name', models.CharField(max_length=128)),
                ('sub_division_department', models.CharField(max_length=128)),
                ('ghatgaddhi_place_name', models.CharField(max_length=128)),
                ('lot_number', models.CharField(max_length=128)),
                ('fiscal_year', models.CharField(choices=[('70/71', '70/71'), ('71/72', '71/72'), ('72/73', '72/73'), ('73/74', '73/74'), ('74/75', '74/75'), ('75/76', '75/76'), ('76/77', '76/77'), ('77/78', '77/78'), ('78/79', '78/79'), ('79/80', '79/80'), ('80/81', '80/81'), ('81/82', '81/82'), ('82/83', '82/83'), ('83/84', '83/84'), ('84/85', '84/85'), ('85/86', '85/86'), ('86/87', '86/87'), ('87/88', '87/88'), ('88/89', '88/89'), ('89/90', '89/90'), ('90/91', '90/91')], max_length=128)),
                ('notice_published_date', models.DateField()),
                ('decision_date', models.DateField()),
                ('bid_price', models.FloatField()),
                ('last_date_to_receive', models.DateField()),
                ('measured_date', models.DateField()),
                ('forest_department', models.CharField(max_length=50)),
                ('truck_number', models.CharField(max_length=50)),
                ('seal_number', models.CharField(max_length=50)),
                ('days_to_pick_up', models.IntegerField()),
                ('last_date_to_pick_up', models.DateField()),
                ('cc_division_forest_office', models.CharField(max_length=50)),
                ('cc_sub_division_forest_office', models.CharField(max_length=50)),
                ('cc_finance_dept_division_forest_office', models.CharField(max_length=50)),
                ('DFO_officer_signature', jsignature.fields.JSignatureField()),
                ('division_forest_office', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='djangonepal.district')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Details',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wood_species', models.CharField(max_length=50)),
                ('quantity', models.CharField(max_length=50)),
                ('dimension', models.CharField(max_length=50)),
                ('total_amount', models.FloatField()),
                ('stamp_टाँचा_description', models.CharField(max_length=128)),
                ('seal_description', models.CharField(max_length=128)),
                ('remarks', models.CharField(max_length=128)),
                ('anusuchi_cha_no', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='forest_pdf_app.anushuchifourteen')),
            ],
        ),
    ]
