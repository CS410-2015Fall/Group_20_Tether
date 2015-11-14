from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    username = models.CharField(max_length=100, unique=True)
    # user_tokens = User.objects.values('auth_token')
    userInfo = models.TextField(null=True, blank=True)
    # token = models.CharField(max_length=100, blank=True)
    friends = models.ManyToManyField('self', blank=True) 
    contracts = models.TextField(null=True, blank=True)

    # requeststring = models.CharField(max_length=100)
    # def __unicode__(self):
    #     return username

    # def get_username(self):
    # 	return self.username

    # def get_userInfo(self):
    # 	return self.userInfo

    # def get_token(self)
    # 	return 

    # token = models.ForeignKey(Token, unique=True, related_name="usertoken")

# class Friendship(models.Model):
# 	user = models.ForeignKey(User)
# 	friend = models.ForeignKey(User, related_name='friends')

# class ProfileManager(models.Manager):
#     def create_profile(self, userbio, token, friends,  **kwargs):
#         if not email:
#             raise ValueError('Users must have a valid email address.')

#         if not kwargs.get('username'):
#             raise ValueError('Users must have a valid username.')

#         profile = self.model(
#             email=self.normalize_email(email), username=kwargs.get('username')
#         )

#         profile.save()

#         return profile