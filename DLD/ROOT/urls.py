from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name = 'index'),
   path('home', views.index, name = 'home'),
   path('chackAnySession', views.chackAnySession, name = 'chackAnySession'),
   path('login', views.login, name = 'login'),
   path('roomList', views.roomList, name = 'roomList'),
   path('getUserInformation', views.getUserInformation, name = 'getUserInformation'),
   path('profilePicUplod', views.profilePicUplod, name = 'profilePicUplod'),
   path('logout', views.logout, name='logout'),
   path('esp32Call', views.esp32Call, name='esp32Call'),
   path('changePassword', views.changePassword, name='changePassword'),
   path('addItem', views.addItem, name='addItem'),
   path('item', views.item, name='item'),
   path('myItem', views.myItem, name='myItem'),
   path('passcodeRecuest', views.passcodeRecuest, name='passcodeRecuest'),
   path('pascode', views.pascode, name='pascode'),
   path('pascodeView', views.pascodeView, name='pascodeView'),
   path('download', views.download, name='download'),
   path('requestPascode', views.requestPascode, name='requestPascode'),
   path('requestPascodeRegected', views.requestPascodeRegected, name='requestPascodeRegected'),
   path('requestPascodeAccepeted', views.requestPascodeAccepeted, name='requestPascodeAccepeted'),
   path('pascodeAccepted', views.pascodeAccepted, name='pascodeAccepted'),
   path('pascodeRegected', views.pascodeRegected, name='pascodeRegected'),
   path('dataLicakge', views.dataLicakge, name='dataLicakge'),
]

