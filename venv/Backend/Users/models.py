from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    friend_with = models.ForeignKey('self', blank=True, null=True, related_name="friend")
    # friends = models.CharField(max_length=500, blank=True, null=True)

    userInfo = models.CharField(max_length=500, blank=True, null=True) 
    contract = models.CharField(max_length=500, null=True, blank=True)
    GCM_token = models.CharField(max_length=100, blank=True)
    # user_tokens = User.objects.values('auth_token')

    # def __unicode__(self):
    #     return username

# class Friendship(models.Model):
#     friend = models.ForeignKey(User, related_name="friend")
#     friend_name = models.CharField(max_length=20)