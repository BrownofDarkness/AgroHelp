from django.db import models

from django.contrib.auth import  get_user_model

User = get_user_model()

# Create your models here.

class Location(models.Model):
    lat = models.DecimalField(decimal_places=6,max_digits=9)
    lng = models.DecimalField(decimal_places=6,max_digits=9)
    name = models.CharField(max_length=255)


    def __str__(self):
        return f"{[self.lat,self.lng]}"
class Soil(models.Model):
    type = models.CharField(max_length=20,unique=True)
    composition = models.CharField(max_length=255)
    def __str__(self):
        return self.nom


class SoilLocation(models.Model):
    soil = models.ForeignKey(Soil,on_delete=models.CASCADE,related_name="locations")
    location = models.ForeignKey(Location,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.soil} {self.location}"

class Culture(models.Model):

    nom = models.CharField(max_length=20)

    def __str__(self):
        return self.nom

class SoilCulture(models.Model):

    soil = models.ForeignKey(Soil,on_delete=models.CASCADE,related_name='soil_culture')
    culture = models.ForeignKey(Culture,on_delete=models.CASCADE)


class Parcel(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='parcels')
    location = models.ForeignKey(Location,on_delete=models.CASCADE)
    area = models.FloatField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"


class CultureParcel(models.Model):
    culture = models.ForeignKey(Culture,on_delete=models.CASCADE)
    parcel = models.ForeignKey(Parcel,on_delete=models.CASCADE,related_name="cultures")

    def __str__(self):
        return f'{self.culture} {self.parcel}'

