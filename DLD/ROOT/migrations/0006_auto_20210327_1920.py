# Generated by Django 3.1.3 on 2021-03-27 13:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ROOT', '0005_auto_20210327_1918'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='room',
            options={'managed': True},
        ),
        migrations.AlterField(
            model_name='loadedetels',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 27, 19, 20, 18, 815789)),
        ),
        migrations.AlterModelTable(
            name='room',
            table='room',
        ),
    ]
