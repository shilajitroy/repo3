from django.shortcuts import render
from django.http.response import JsonResponse
from django.db import connection
from .models import ProfilePicture, User, Item
import time
from random import randint
import datetime

def dictfetchall(cursor):
    desc = cursor.description 
    return [
            dict(zip([col[0] for col in desc], row)) 
            for row in cursor.fetchall()
        ]
def index(request):
    data = {}
    if request.method == "GET":
        return render(request, 'index.html', {})
    elif request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute('SELECT count(*) FROM item')
            data['noi'] = c.fetchone()  # number of item
            c.execute('SELECT count(*) FROM item WHERE userId_id = %s', [request.session['user']])
            data['nomi'] = c.fetchone()  # number of my item
            c.execute('SELECT count(*) from item, user, pascodeRequest WHERE pascodeRequest.userId = user.id and pascodeRequest.itemId = item.id and pascodeRequest.valid = 0 and item.userId_id = %s', [request.session['user']])
            data['nopc'] = c.fetchone()  # number of Passcode
            c.execute("SELECT count(*) from item, user, pascodeRequest WHERE item.userId_id = user.id and pascodeRequest.itemId = item.id and pascodeRequest.userId = %s", [request.session['user']])
            data['nopr'] = c.fetchone()  # number of Passcode request

            # table start
            c.execute("SELECT item.id, item.name, firstName || ' ' || lastName as user from item, user WHERE item.userId_id = user.id order by item.id desc limit 4")
            data['itemTable'] = dictfetchall(c)  # Item Table

            c.execute("SELECT item.id, item.name, firstName || ' ' || lastName as user from item, user WHERE item.userId_id = user.id and user.id = %s order by item.id desc limit 4", [request.session['user']])
            data['myItemTable'] = dictfetchall(c)  # My item Table

            c.execute("SELECT pascodeRequest.id, item.id as itemId, item.name, user.id as userId, firstName || ' ' || lastName as user from item, user, pascodeRequest WHERE pascodeRequest.userId = user.id and pascodeRequest.itemId = item.id and pascodeRequest.valid = 0 and item.userId_id = %s order by pascodeRequest.id desc limit 4", [request.session['user']])
            data['PascodeTable'] = dictfetchall(c)  # Pascode table
            c.execute(
                "SELECT item.id, item.name, firstName || ' ' || lastName as user from item, user, pascodeRequest WHERE item.userId_id = user.id and pascodeRequest.itemId = item.id and pascodeRequest.userId = %s order by pascodeRequest.id desc limit 4",
                [request.session['user']])
            data['pascodeRequestTable'] = dictfetchall(c) # Requested Pascode table
    else:
        data['login'] = False
    return JsonResponse(data)
def chackAnySession(request):
    data = {}
    if request.session.has_key('user'):
        data['login'] = True
    else:
        data['login'] = False
    return JsonResponse(data)

def login(request):
    if request.method == "POST":
        data = {}
        if request.POST['userId'] == '':
            data['warning'] = 'fill up user id'
        elif request.POST['password'] == '':
            data['warning'] = 'fill up password'
        else:
            with connection.cursor() as c:
                c.execute('SELECT * FROM user WHERE userId = %s and password = %s', [request.POST['userId'], request.POST['password']])
                r = c.fetchone()
                if r is not None:
                    request.session['user'] = r[0]
                    data['success'] = 'Login Successfully'
                else:
                    data['error'] = 'Your record Not available'
        return JsonResponse(data)
    
def roomList(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login']=True
        if request.session['user'] == 1:
            data['admin'] = True
        else:
            data['admin'] = False
    else:
        data['login'] = False
    return JsonResponse(data)

def getUserInformation(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login']=True
        with connection.cursor() as c:
            c.execute('SELECT img FROM profilepicture, user WHERE user.id = userId_id and userId_id = %s and profilePicture = imgNo', [request.session['user']])
            r = c.fetchone()
            if r is not None:
                data['img'] = '/media/'+r[0]
            else:
                data['img'] = '/media/images/user.svg'
            c.execute('SELECT firstName, lastName from user WHERE id = %s', [request.session['user']])
            r = c.fetchone()
            if r is not None:
                data['firstName'] = r[0]
                data['lastName'] = r[1]
    else:
        data['login'] = False
    return JsonResponse(data)

def profilePicUplod(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login']=True
        imgNo = 0
        with connection.cursor() as c:
            c.execute('SELECT max(imgNo)+1 FROM profilepicture WHERE userId_id = %s', [request.session['user']])
            r = c.fetchone()
            if r is not None:
                imgNo = r[0]
        if imgNo is None:
            imgNo = 0
        profilePic = ProfilePicture()
        profilePic.imgNo = imgNo
        profilePic.userId = User.objects.get(id=request.session['user'])
        profilePic.img = request.FILES['pp']
        profilePic.save()
        sql = 'UPDATE user set profilePicture = %s WHERE id = %s'
        with connection.cursor() as c:
            c.execute(sql, [imgNo, request.session['user']])
    else:
        data['login'] = False
    return JsonResponse(data)

def logout(request):
    data = {}
    if request.session.has_key('user'):
        del request.session['user'];
        data['success'] = 'Logout Successfuly'
    else:
        data['warning']='Sumthing Wos rong Plise Rey try later'
    return JsonResponse(data)

def esp32Call(request):
    data = {}
    data['name'] = 'tanmoy Chaku'
    data['esp32Id'] = request.GET['esp32Id']
    print(request)
    print(request.GET)
    time.sleep(5)
    return JsonResponse(data)

def changePassword(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        data['update'] = False
        if request.POST['oldPassword'] == '':
            data['warning'] = 'Fill up old Password'
        elif request.POST['password'] == '':
            data['warning'] = 'fill up password'
        elif request.POST['rePassword'] == '':
            data['warning'] = 'fill up Ree password'
        elif request.POST['rePassword'] != request.POST['password']:
            data['warning'] = 'Passord and re password not match'
        else:
            with connection.cursor() as c:
                c.execute('SELECT * FROM user WHERE id = %s and password = %s',
                          [request.session['user'], request.POST['oldPassword']])
                r = c.fetchone()
                if r is not None:
                    c.execute('update user set password = %s WHERE id = %s', [request.session['user'], request.POST['password']])
                    data['success'] = 'Password Change Successfully'
                    data['update'] = True
                else:
                    data['error'] = 'Your old Password is wring'
    else:
        data['login'] = False

    return JsonResponse(data)

def addItem(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        data['update'] = False
        if request.POST['name'] == '':
            data['warning'] = 'Fill up Name'
        elif bool(request.FILES.get('path', False)) == False:
            data['warning'] = 'Chose a File'
        else:
            with connection.cursor() as c:
                item = Item()
                item.name = request.POST['name']
                item.discption = request.POST['discption']
                item.has = randint(100000, 999999)
                item.userId = User.objects.get(id=request.session['user'])
                item.path = request.FILES['path']
                item.save()
                data['success'] = 'Item Addeded Successfully'
                data['update'] = True
    else:
        data['login'] = False

    return JsonResponse(data)


def item(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT item.id, item.name, firstName || ' ' || lastName as user from item, user WHERE item.userId_id = user.id")
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)

def myItem(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT item.id, item.name, firstName || ' ' || lastName as user from item, user WHERE item.userId_id = user.id and user.id = %s", [request.session['user']])
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)



def pascode(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT item.id, item.name, firstName || ' ' || lastName as user from item, user, pascodeRequest WHERE item.userId_id = user.id and pascodeRequest.itemId = item.id and pascodeRequest.userId = %s", [request.session['user']])
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)


def passcodeRecuest(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute(
                "SELECT * FROM pascodeRequest WHERE userId = %s and itemId = %s",
                [request.session['user'], request.POST['id']])
            if c.fetchone() is None:
                c.execute('insert into pascodeRequest(userId, itemId, valid) VALUES(%s, %s, 0)', [request.session['user'], request.POST['id']])
                data['success'] = 'Request Has bin Send Successfuly'
            else:
                data['warning'] = 'Request Alrady Send'
    else:
        data['login'] = False

    return JsonResponse(data)


def pascodeView(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT pascodeRequest.valid, item.has FROM pascodeRequest, item WHERE pascodeRequest.itemId = item.id and pascodeRequest.userId = %s and pascodeRequest.itemId = %s", [request.session['user'], request.POST['id']])
            r = c.fetchone()
            if r is not None:
                if r[0] == 0:
                    data['data'] = '<div class="h1">No Accition Nid</div>'
                elif r[0] == 1:
                    data['data'] = '<div class="h1"> Passcode : ' + r[1] + ' </div>'
                else:
                    data['data'] = '<div class="h1"> Request Regicted </div>'
            else:
                data['error'] = 'Un utorcate request'
    else:
        data['login'] = False

    return JsonResponse(data)


def download(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("select path from item where id = %s and has = %s", [request.POST['itemId'], request.POST['pascode']])
            r = c.fetchone()
            if r is not None:
                data['file'] = r[0]
                c.execute('SELECT * from pascodeRequest WHERE itemId = %s and userId = %s and valid = 1', [request.POST['itemId'], request.session['user']])
                if c.fetchone() is None:
                    c.execute('INSERT INTO dataLickeg (itemId, userId, time) VALUES(%s, %s, %s)', [request.POST['itemId'], request.session['user'],  datetime.datetime.now()])
            else:
                data['error'] = 'Invalid Pascode'
    else:
        data['login'] = False

    return JsonResponse(data)


def requestPascode(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT pascodeRequest.id, item.id as itemId, item.name, user.id as userId, firstName || ' ' || lastName as user from item, user, pascodeRequest WHERE pascodeRequest.userId = user.id and pascodeRequest.itemId = item.id and pascodeRequest.valid = 0 and item.userId_id = %s", [request.session['user']])
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)

def requestPascodeAccepeted(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT pascodeRequest.id, item.id as itemId, item.name, user.id as userId, firstName || ' ' || lastName as user from item, user, pascodeRequest WHERE pascodeRequest.userId = user.id and pascodeRequest.itemId = item.id and pascodeRequest.valid = 1 and item.userId_id = %s", [request.session['user']])
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)

def requestPascodeRegected(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute("SELECT pascodeRequest.id, item.id as itemId, item.name, user.id as userId, firstName || ' ' || lastName as user from item, user, pascodeRequest WHERE pascodeRequest.userId = user.id and pascodeRequest.itemId = item.id and pascodeRequest.valid = 3 and item.userId_id = %s", [request.session['user']])
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)

def pascodeRegected(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute(
                "SELECT * from item WHERE userId_id = %s and id = (SELECT itemId from pascodeRequest WHERE id = %s)",
                [request.session['user'], request.POST['id']])
            if c.fetchone() is not None:
                c.execute('UPDATE pascodeRequest set valid = 3 where id = %s',
                          [request.POST['id']])
                data['warning'] = 'Request Regected Successfuly'
            else:
                data['warning'] = 'Un atocate request'
    else:
        data['login'] = False

    return JsonResponse(data)

def pascodeAccepted(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user'):
        data['login'] = True
        with connection.cursor() as c:
            c.execute(
                "SELECT * from item WHERE userId_id = %s and id = (SELECT itemId from pascodeRequest WHERE id = %s)",
                [request.session['user'], request.POST['id']])
            if c.fetchone() is not None:
                c.execute('UPDATE pascodeRequest set valid = 1 where id = %s',
                          [request.POST['id']])
                data['success'] = 'Request Accepted Successfuly'
            else:
                data['warning'] = 'Un atocate request'
    else:
        data['login'] = False

    return JsonResponse(data)

def dataLicakge(request):
    data = {}
    if request.method == "POST" and request.session.has_key('user') and request.session['user'] == 1:
        data['login'] = True
        with connection.cursor() as c:
            c.execute(
                "SELECT dataLickeg.id, user.id as userId, user.firstName || ' ' || user.lastName as userName, item.id as itemId, item.name as itemName, time from dataLickeg, item, user WHERE dataLickeg.itemId = item.id and dataLickeg.userId = user.id")
            data['table'] = dictfetchall(c)
    else:
        data['login'] = False

    return JsonResponse(data)

