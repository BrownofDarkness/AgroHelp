from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import fields
from rest_framework.authtoken.models import Token
from rest_framework.serializers import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'type']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True,
            },
            'email': {
                'required': True,
            },
        }


class LoginSerializer(serializers.Serializer):
    email = fields.CharField(required=True, max_length=120, help_text='User\'s email')
    password = fields.CharField(required=True, max_length=120, help_text='User\'s password')