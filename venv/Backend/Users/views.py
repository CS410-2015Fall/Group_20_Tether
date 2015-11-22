from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

# import json
from Users.models import UserProfile
from rest_framework.authtoken.models import Token
from rest_framework import serializers
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


# class UserProfileView(request):
#     """
#     Returns User's profiles in JSON format.

#     Accepts the following GET parameters: token
#     Accepts the following POST parameters:
#         Required: token
#         Optional: userInfo, friends, contracts, GCM_token

#     """

#     serializer_class = UserSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_object(self):
#         return self.request.user


def get_friends(request):
	all_friends = UserProfile.objects.values('friend_with')
	all_friends_names = all_friends.values('user')

	html = "<html><body>Friends are: %s.</body></html>" % all_friends_names
	return HttpResponse(html) 	

