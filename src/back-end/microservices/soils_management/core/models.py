# from django.db import models
from django.contrib.gis.db import models

# Create your models here.

class Soil(models.Model):
    type = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank= True)
    composition = models.TextField()

    def __str__(self):
        return self.type
    

class SoilArea(models.Model):
    soil = models.ForeignKey(
        Soil, on_delete=models.CASCADE, related_name='areas')
    polygon = models.PolygonField(srid=4326)

    def __str__(self) -> str:
        return f"{self.soil}"
    

class SoilCulture(models.Model):
    id = models.BigIntegerField(primary_key=True)
    soil = models.ForeignKey(
        Soil, on_delete=models.CASCADE, related_name='soil_culture')
    culture = models.BigIntegerField()

    def __str__(self) -> str:
        return f" {self.soil} culture"

    class Meta:
        unique_together = ('soil', 'culture',)