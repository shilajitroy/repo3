# Generated by Django 3.2.7 on 2022-05-14 16:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ROOT', '0014_auto_20220514_2132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loadedetels',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 14, 21, 33, 34, 615283)),
        ),
        migrations.AlterField(
            model_name='pascoderequest',
            name='valid',
            field=models.IntegerField(default=0),
        ),
    ]
