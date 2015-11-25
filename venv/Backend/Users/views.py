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


from django.contrib.auth.models import User
from friendship.models import Friend, Follow


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
	all_friends = Friend.objects.friends(request.user)
	all_friends_names = all_friends.values('user')

	html = "<html><body>Friends are: %s.</body></html>" % all_friends_names
	return HttpResponse(html) 	



def my_friend_view(request):
    # List of this user's friends
    all_friends = Friend.objects.friends(request.user)

    # List all unread friendship requests
    requests = Friend.objects.unread_requests(user=request.user)

    # List all rejected friendship requests
    rejects = Friend.objects.rejected_requests(user=request.user)

    # Count of all rejected friendship requests
    reject_count = Friend.objects.rejected_request_count(user=request.user)

    # List all unrejected friendship requests
    unrejects = Friend.objects.unrejected_requests(user=request.user)

    # Count of all unrejected friendship requests
    unreject_count = Friend.objects.unrejected_request_count(user=request.user)

    # List all sent friendship requests
    sent = Friend.objects.sent_requests(user=request.user)

    # List of this user's followers
    all_followers = Follow.objects.followers(request.user)

    # List of who this user is following
    following = Follow.objects.following(request.user)

    ### Managing friendship relationships

    # Create a friendship request
    other_user = User.objects.get(pk=1)
    new_relationship = Friend.objects.add_friend(request.user, other_user)

    # Can optionally save a message when creating friend requests
    message_relationship = Friend.objects.add_friend(
        from_user=request.user,
        to_user=some_other_user,
        message='Hi, I would like to be your friend',
    )

    # And immediately accept it, normally you would give this option to the user
    new_relationship.accept()

    # Now the users are friends
    Friend.objects.are_friends(request.user, other_user) == True

    # Remove the friendship
    Friend.objects.remove_friend(other_user, request.user)

    # Create request.user follows other_user relationship
    following_created = Follow.objects.add_follower(request.user, other_user)