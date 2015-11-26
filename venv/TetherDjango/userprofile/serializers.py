from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

class UserSerializer(UserDetailsSerializer):

    points = serializers.CharField(source="userprofile.points")
    gcm_token = serializers.CharField(source="userprofile.gcm_token")
    friends = serializers.CharField(source='userprofile.friends')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('gcm_token','points','friends',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        gcm_token = profile_data.get('gcm_token')
        points = profile_data.get('points')
        friends = profile_data.get('friends')
        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and gcm_token:
            profile.gcm_token = gcm_token
            profile.save()
        if profile_data and points:
            profile.points = points
            profile.save()
        if profile_data and friends:
            profile.friends = friends
            profile.save()
        return instance