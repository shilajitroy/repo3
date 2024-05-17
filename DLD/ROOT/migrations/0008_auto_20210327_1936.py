# Generated by Django 3.1.3 on 2021-03-27 14:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ROOT', '0007_auto_20210327_1920'),
    ]

    operations = [
        migrations.CreateModel(
            name='PandingTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('esp32Id', models.IntegerField()),
            ],
            options={
                'db_table': 'pandingTask',
                'managed': True,
            },
        ),
        migrations.AlterField(
            model_name='loadedetels',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 27, 19, 36, 13, 925748)),
        ),
    ]