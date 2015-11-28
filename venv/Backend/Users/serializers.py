# from rest_framework import serializers

# from Users.models import UserProfile

# class ProfileSerializer(serializers.ModelSerializer):
# 	user = serializers.Field(source='user')

# 	class Meta:
# 		model = UserProfile
# 		fields = ('id','email','username','userInfo','friends','contracts') 

# class UserSerializer(serializers.ModelSerializer):
#     snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())

#     class Meta:
#         model = User
#         fields = ('id', 'username', 'snippets')

from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer


# class UserSerializer(UserDetailsSerializer):

#     # username = models.CharField(max_length=100, unique=True)
#     # user_tokens = User.objects.values('auth_token')
#     # userInfo = serializers.TextField(source="userprofile.GCM_token")
#     # # friends = models.ManyToManyField('self', blank=True) 
#     # contract = serializers.CharField(source="userprofile.GCM_token")
#     GCM_token = serializers.CharField(source="userprofile.GCM_token")

#     class Meta(UserDetailsSerializer.Meta):
#         fields = UserDetailsSerializer.Meta.fields + ('GCM_token',)

#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('userprofile', {})
#         company_name = profile_data.get('GCM_token')

#         instance = super(UserSerializer, self).update(instance, validated_data)

#         # get and update user profile
#         profile = instance.userprofile
#         if profile_data and GCM_token:
#             profile.GCM_token = GCM_token
#             profile.save()
#         return instance

class UserSerializer(UserDetailsSerializer):

    # username = models.CharField(max_length=100, unique=True)
    # user_tokens = User.objects.values('auth_token')
    userInfo = serializers.CharField(source="userprofile.userInfo")
    # friends= serializers.CharField(source="userprofile.friends")
    contract = serializers.CharField(source="userprofile.contract")
    GCM_token = serializers.CharField(source="userprofile.GCM_token")
    follow = serializers.CharField(source="followingmanager.following")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('GCM_token','userInfo','contract', 'follow',) 

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        GCM_token = profile_data.get('GCM_token')
        userInfo = profile_data.get('userInfo')
        contract = profile_data.get('contract')
        following = profile_data.get('follow')
        # friends = profile_data.get('friends')
        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and GCM_token:
            profile.GCM_token = GCM_token
            profile.save()
        if profile_data and userInfo:
            profile.userInfo = userInfo
            profile.save()
        if profile_data and contract:
            profile.contract = contract
            profile.save()
        # if profile_data and friends:
        #     profile.friends = friends
        #     profile.save()
        return instance
