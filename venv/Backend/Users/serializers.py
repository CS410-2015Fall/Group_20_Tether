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