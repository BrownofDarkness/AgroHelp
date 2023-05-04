from rest_framework import serializers
from rest_framework import fields


class TokenSerializer(serializers.Serializer):

    token = fields.CharField(max_length=255)


class UserSerializer(serializers.Serializer):

    USER_TYPES = (
        ('agriculteur', 'agriculteur'),
        ('expert', 'expert')
    )
    username = fields.CharField(max_length=120)
    email = fields.EmailField(max_length=255)
    password = fields.CharField(max_length=255)
    type = fields.ChoiceField(choices=USER_TYPES)


class LoginSerializer(serializers.Serializer):
    email = fields.CharField(
        required=True, max_length=120, help_text='User\'s email')
    password = fields.CharField(
        required=True, max_length=120, help_text='User\'s password')


class PasswordResetSerializer(serializers.Serializer):

    user = serializers.IntegerField()
    password = serializers.CharField(max_length=255, help_text='password')
    confirm_password = serializers.CharField(
        max_length=255, help_text='confirm password')

    class Meta:
        extra_kwargs = {
            'password': {
                'required': True
            },
            'confirm_password': {
                'required': True
            }
        }


class UpdatePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(
        max_length=120, help_text='old password')
    new_password = serializers.CharField(
        max_length=120, help_text='new password')
    confirm_password = serializers.CharField(
        max_length=120, help_text='confirmation of the new password')

    class Meta:
        extra_kwargs = {
            'old_password': {
                'required': True
            },
            'new_password': {
                'required': True
            },
            'confirm_password': {
                'required': True
            }
        }


class SuccessSerializer(serializers.Serializer):

    success = fields.BooleanField()
