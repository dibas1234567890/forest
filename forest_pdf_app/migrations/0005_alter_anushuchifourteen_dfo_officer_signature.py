# Generated by Django 5.0.6 on 2024-07-14 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forest_pdf_app", "0004_alter_anushuchifourteen_dfo_officer_signature"),
    ]

    operations = [
        migrations.AlterField(
            model_name="anushuchifourteen",
            name="DFO_officer_signature",
            field=models.TextField(blank=True, null=True),
        ),
    ]
