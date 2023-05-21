from django.contrib.gis.db import models

from django.contrib.auth import get_user_model

from django.utils.html import format_html

User = get_user_model()

# Create your models here.


class Soil(models.Model):
    type = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    composition = models.CharField(max_length=255)

    def __str__(self):
        return self.type


class Culture(models.Model):
    photo = models.ImageField(upload_to="culture", blank=True, null=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField()
    
    def __str__(self):
        return self.name

    def photo_preview(self):
        if self.photo:
            return format_html(f"<img src='{self.photo.url}' width='400px' heigth='400px' class='rounded float-right' />")
        
        return None


class SoilCulture(models.Model):
    soil = models.ForeignKey(Soil, on_delete=models.CASCADE, related_name="soil_culture")
    
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE, related_name="soil_culture")

    def __str__(self) -> str:
        return f"{self.culture} best in {self.soil}"

    class Meta:
        unique_together = ("soil","culture",)


class Parcel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="parcels")
    location = models.PointField(srid=4326)
    area = models.FloatField(help_text="in square meter")
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"


class CultureParcel(models.Model):
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE, related_name="parcel")
    
    parcel = models.ForeignKey(Parcel, on_delete=models.CASCADE, related_name="cultures")

    def __str__(self):
        return f"{self.culture} {self.parcel}"

    class Meta:
        unique_together = ("culture", "parcel")


class SoilArea(models.Model):
    name = models.CharField(help_text="Name of the soil area", max_length=255)
    
    soil = models.ForeignKey(Soil, on_delete=models.CASCADE, related_name="areas")
    
    polygon = models.PolygonField(srid=4326)

    def __str__(self) -> str:
        return f"{self.soil}"


class AgriculturePractice(models.Model):
    name = models.CharField(help_text="Name of the agricultural practice", max_length=255)
    
    culture = models.ForeignKey(Culture, on_delete=models.CASCADE, related_name="agriculture_practice")
    
    practise = models.TextField()

    def __str__(self) -> str:
        return f"{self.name} : {self.culture}"


class CultureDiseaseAdvice(models.Model):
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name="culture_disease_advice"
    )
    image = models.ImageField(upload_to="disease", blank=True, null=True)
    disease_name = models.CharField(max_length=255)
    solution = models.TextField()

    def __str__(self) -> str:
        return f"{self.culture} {self.disease_name}"

    def image_preview(self):
        return format_html(f"<img src='{self.image.url}' width='400' heigth='400'/>")


class Fertilizer(models.Model):
    TYPE = (("orgnaic", "organic"), ("chemical", "chemical"))
    name = models.CharField(max_length=100)
    composition = models.TextField()
    type = models.CharField(max_length=25, choices=TYPE)
    description = models.TextField()

    def __str__(self) -> str:
        return self.name


class CultureFilizer(models.Model):
    fertilizer = models.ForeignKey(
        Fertilizer, on_delete=models.CASCADE, related_name="culture_fertilizer"
    )

    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name="fertilizers"
    )
