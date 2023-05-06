from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Soil

from .serializers import _SoilSerializer

from .producer import publish


@receiver(post_save, sender=Soil)
def notify_culture_service(sender, instance, created, **kwargs):
    data = _SoilSerializer(instance)
    if created:
        publish("soil_created", data.data)

    else:
        publish("soil_updated", data.data)
