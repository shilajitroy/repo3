from django.db import models
from datetime import  datetime
from django.template.defaultfilters import default


class User(models.Model):
    firstName = models.CharField(max_length = 200)
    lastName = models.CharField(max_length = 200)
    userId = models.CharField(max_length = 400)
    password = models.CharField(max_length = 200)
    profilePicture = models.IntegerField(default = 0)
    def __str__(self):
        return 'User Id : ' + self.userId + ' password : ' + self.password + ' Name : ' + self.firstName + ' ' + self.lastName
    class Meta:
        managed = True
        db_table = 'user'


class Room(models.Model):
    roomName = models.CharField(max_length = 200)

    def __str__(self):
        return 'Room Name : ' + self.roomName
    class Meta:
        managed = True
        db_table = 'room'


class Loade(models.Model):
    lodeName = models.CharField(max_length = 200)
    roomId = models.ForeignKey(Room, default = 1, on_delete=models.SET_DEFAULT)
    lodeAutoOff = models.IntegerField(default = -1)

    def __str__(self):
        return 'Lode Name : ' + self.lodeName + ' Room Id : ' + str(self.roomId) + ' Lode Auto Off: ' + str(self.lodeAutoOff)
    class Meta:
        managed = True
        db_table = 'loade'
class LodeLable(models.Model):
    lodId = models.ForeignKey(Loade, default = 1, on_delete=models.SET_DEFAULT)
    value = models.IntegerField(default = 100)
    def __str__(self):
        return models.Model.__str__(self)
    class Meta:
        managed = True
        db_table = 'lodeLable'

class LoadeDetels(models.Model):
    lodeId = models.ForeignKey(Loade, default = 1, on_delete=models.SET_DEFAULT)
    userId = models.ForeignKey(User, default = 1, on_delete = models.SET_DEFAULT)
    onOff = models.BooleanField(default = False)
    time = models.DateTimeField(default = datetime.now())

    def __str__(self):
        return 'Load Name : %s User Name: %s On OF Status: %s Date Time: %s' % (str(self.lodeId), str(self.userId), str(self.onOff), str(self.time))
    class Meta:
        managed = True
        db_table = 'loadeDetels'
    
class ProfilePicture(models.Model):
    class Meta:
        unique_together = (('imgNo', 'userId'))
    imgNo = models.IntegerField()
    userId = models.ForeignKey(User, default = 1, on_delete = models.SET_DEFAULT)
    img = models.ImageField(upload_to='images/')
    def __str__(self):
        return 'Name : %s ' % (str(self.img))
    class Meta:
        managed = True
        db_table = 'profilePicture'

class PandingTask(models.Model):
    esp32Id = models.IntegerField()
    class Meta:
        managed = True
        db_table = 'pandingTask'

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey('User', models.DO_NOTHING)
    name = models.CharField(max_length=400)
    discption = models.CharField(max_length=1000, blank=True, null=True)
    path = models.ImageField(upload_to='item/')
    has = models.CharField(max_length=6)
    def __str__(self):
        return 'Item Id : ' + str(self.id) + ' User Id : ' + str(self.userId) + ' Name : ' + self.name + ' Pascode ' + str(self.has)
    class Meta:
        managed = True
        db_table = 'item'

class PascodeRequest(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey('User',  models.DO_NOTHING, db_column='userId')
    itemId = models.ForeignKey('Item', models.DO_NOTHING, db_column='itemId')
    valid = models.IntegerField(default=0)
    def __str__(self):
        return 'Pascode Id : ' + str(self.id) + ' User Id : ' + str(self.userId) + ' Item Id : ' + str(self.itemId) + ' valid ' + str(self.valid)
    class Meta:
        managed = True
        db_table = 'pascodeRequest'

class dataLickeg(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey('User',  models.DO_NOTHING, db_column='userId')
    itemId = models.ForeignKey('Item', models.DO_NOTHING, db_column='itemId')
    time = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return 'dataLickeg Id : ' + str(self.id) + ' User Id : ' + str(self.userId) + ' Item Id : ' + str(self.itemId) + ' time ' + str(self.time)
    class Meta:
        managed = True
        db_table = 'dataLickeg'