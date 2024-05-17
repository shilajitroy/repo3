# Generated by Django 3.0.5 on 2020-05-10 04:25

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ROOT', '0002_auto_20200430_0400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loadedetels',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2020, 5, 10, 9, 55, 7, 341117)),
        ),
        migrations.CreateModel(
            name='LodeLable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField(default=100)),
                ('lodId', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='ROOT.Loade')),
            ],
        ),
    ]