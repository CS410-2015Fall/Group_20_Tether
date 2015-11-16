from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

class UserSerializer(UserDetailsSerializer):

    gcm_token = serializers.CharField(source="userprofile.gcm_token")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('gcm_token',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        gcm_token = profile_data.get('gcm_token')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and gcm_token:
            profile.gcm_token = gcm_token
            profile.save()
        return instance