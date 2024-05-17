from django.contrib import admin
from .models import User
from .models import Room
from .models import Loade
from .models import LoadeDetels
from .models import ProfilePicture
from .models import LodeLable
from .models import Item
from .models import PascodeRequest
from .models import dataLickeg


admin.site.register(User)
admin.site.register(Room)
admin.site.register(Loade)
admin.site.register(LoadeDetels)
admin.site.register(ProfilePicture)
admin.site.register(LodeLable)
admin.site.register(Item)
admin.site.register(dataLickeg)
admin.site.register(PascodeRequest)
