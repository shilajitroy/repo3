# Generated by Django 3.2.7 on 2022-05-16 07:05

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ROOT', '0015_auto_20220514_2133'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loadedetels',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 16, 12, 35, 37, 841575)),
        ),
        migrations.CreateModel(
            name='dataLickeg',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('itemId', models.ForeignKey(db_column='itemId', on_delete=django.db.models.deletion.DO_NOTHING, to='ROOT.item')),
                ('userId', models.ForeignKey(db_column='userId', on_delete=django.db.models.deletion.DO_NOTHING, to='ROOT.user')),
            ],
            options={
                'db_table': 'dataLickeg',
                'managed': True,
            },
        ),
    ]
