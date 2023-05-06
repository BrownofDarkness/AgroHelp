from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete

from .models import Culture
from .api.serializers import _CultureSerializer
from .producer import publish


@receiver(post_save, sender=Culture)
def notify_soil_service(sender, created, instance, **kwargs):
    data = _CultureSerializer(instance).data
    if created:
        publish("culture_created", data)

    else:
        publish("culture_updated", data)


@receiver(post_delete, sender=Culture)
def notify_soil_service_2(sender, instance, **kwargs):
    data = _CultureSerializer(instance).data
    publish("culture_deleted", data)
