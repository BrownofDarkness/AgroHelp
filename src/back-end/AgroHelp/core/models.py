# from django.db import models
from django.contrib.gis.db import models

from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Soil(models.Model):
    type = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank= True)
    composition = models.CharField(max_length=255)

    def __str__(self):
        return self.type


class Culture(models.Model):

    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class SoilCulture(models.Model):

    soil = models.ForeignKey(
        Soil, on_delete=models.CASCADE, related_name='soil_culture')
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name='soil_culture')

    def __str__(self) -> str:
        return f"{self.culture} best in {self.soil}"

    class Meta:
        unique_together = ('soil', 'culture',)


class Parcel(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='parcels')
    location = models.PointField(srid=4326)
    area = models.FloatField(help_text='in square meter')
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"


class CultureParcel(models.Model):
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE)
    parcel = models.ForeignKey(
        Parcel, on_delete=models.CASCADE, related_name="cultures")

    def __str__(self):
        return f'{self.culture} {self.parcel}'


class SoilArea(models.Model):
    soil = models.ForeignKey(
        Soil, on_delete=models.CASCADE, related_name='areas')
    polygon = models.PolygonField(srid=4326)

    def __str__(self) -> str:
        return f"{self.soil}"


class AgriculturePractice(models.Model):
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name='agriculture_practice')
    practise = models.TextField()
