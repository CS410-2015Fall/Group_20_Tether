from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponse
from Users.models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import viewsets
# import json
from rest_framework.authtoken.models import Token
from rest_auth.serializers import UserDetailsSerializer



# Create your views here.
def get_all_user_profile(request):

	all_users = User.objects.all()
	all_user_tokens = User.objects.values('auth_token')
	all_user_names = User.objects.values('username')

	all_user_Profiles = UserProfile.objects.all()



	html = "<html><body>username is: %s.</body></html>" % request, all_user_names, all_user_tokens
	return HttpResponse(html) 

def get_user_profile(request):
	user = request.user
	# user = UserProfile.objects.filter(username = request.user)



	html = "<html><body>username is: %s.</body></html>" % user

	# if request.method == "GET":
	# 	requeststring = request
	# 	print (request)
	# 	respnose
	# 	data = json.loads(request)
	# 	print (data)
	# # # 	try:
	# # 		token = 	

def get_friends(request):
	all_friends = UserProfile.objects.values('friends')
	all_friends_names = all_friends.values('username')
	all_friends_bio = all_friends.values('userInfo')

	html = "<html><body>username is: %s.</body></html>" % all_friends_names

	return HttpResponse(html) 	

