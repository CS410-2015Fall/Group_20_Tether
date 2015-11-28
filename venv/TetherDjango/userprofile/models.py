from django.db import models
from django.contrib.auth.models import User
from annoying.fields import AutoOneToOneField

class UserProfile(models.Model):
	user = AutoOneToOneField(User,primary_key=True)
    # custom fields for user
	points = models.CharField(max_length=100, blank=True)
	gcm_token = models.CharField(max_length=150, blank=True)
	friends = models.TextField()
	# wins loses