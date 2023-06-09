from django.dispatch import receiver
from django.db.models.signals import post_save

from django.contrib.auth import get_user_model

from rest_framework.authtoken.models import Token

from .producer import publish

from .api.serializers import UserSerializer

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_token(sender, created, instance, **kwargs):
    if created:
        Token.objects.create(user=instance)
        publish('user_created',UserSerializer(instance).data)