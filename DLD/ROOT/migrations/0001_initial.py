import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Loade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lodeName', models.CharField(max_length=200)),
                ('lodePowerValue', models.IntegerField(default=100)),
                ('lodeAutoOff', models.IntegerField(default=-1)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roomName', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('userId', models.CharField(max_length=400)),
                ('password', models.CharField(max_length=200)),
                ('profilePicture', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='LoadeDetels',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('onOff', models.BooleanField(default=False)),
                ('time', models.DateTimeField(default=datetime.datetime(2020, 4, 30, 3, 50, 17, 297025))),
                ('lodeId', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='ROOT.Loade')),
                ('userId', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='ROOT.User')),
            ],
        ),
        migrations.AddField(
            model_name='loade',
            name='roomId',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='ROOT.Room'),
        ),
        migrations.CreateModel(
            name='ProfilePicture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imgNo', models.IntegerField()),
                ('choise', models.CharField(max_length=200)),
                ('img', models.ImageField(upload_to='images/')),
                ('userId', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='ROOT.User')),
            ],
            options={
                'unique_together': {('imgNo', 'userId')},
            },
        ),
    ]
