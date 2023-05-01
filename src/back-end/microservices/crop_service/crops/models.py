from django.db import models
from django.contrib.gis.db import models
# Create your models here.


# class User(models.Model):
#     pass


class Soil(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.pk


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


class CulturePractice(models.Model):
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name='culture_practice')
    practise = models.TextField()


class CultureDiseaseAdvice(models.Model):
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name='culture_disease_advice')
    disease_name = models.CharField(max_length=255)
    solution = models.TextField()

    def __str__(self) -> str:
        return f"{self.culture} {self.disease_name}"


# class Parcel(models.Model):
#     user = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name='parcels')
#     location = models.PointField(srid=4326)
#     area = models.FloatField(help_text='in square meter')
#     name = models.CharField(max_length=255)

#     def __str__(self):
#         return f"{self.name}"
