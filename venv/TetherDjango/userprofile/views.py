from rest_framework import generics, permissions
from rest_auth.serializers import UserDetailsSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer
class UserList(generics.ListCreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_class = [
		permissions.AllowAny
	]


	