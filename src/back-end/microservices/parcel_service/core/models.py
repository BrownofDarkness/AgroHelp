# from django.db import models
from django.contrib.gis.db import models


class Parcel(models.Model):
    user = models.BigIntegerField(unique=True)
    location = models.PointField(srid=4326)
    area = models.FloatField(help_text='in square meter')
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"


class CultureParcel(models.Model):
    culture = models.BigIntegerField(unique=True)
    parcel = models.ForeignKey(
        Parcel, on_delete=models.CASCADE, related_name="cultures")

    def __str__(self):
        return f'culture {self.culture} on {self.parcel}'
