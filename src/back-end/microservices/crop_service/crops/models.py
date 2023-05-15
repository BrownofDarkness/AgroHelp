from django.db import models
from django.utils.html import format_html

# Create your models here.


class Soil(models.Model):
    id = models.BigIntegerField(primary_key=True)
    type = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=1000)
    composition = models.CharField(max_length=1000,default='')

    def __str__(self):
        return self.pk


class Culture(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images")

    def image_preview(self):
        return format_html(
            f"<img src='{self.image.url}' width='400px' heigth='400px' classs='rounded float-right' />"
        )

    def __str__(self):
        return self.name.capitalize()


class SoilCulture(models.Model):
    soil = models.ForeignKey(
        Soil, on_delete=models.CASCADE, related_name="soil_culture"
    )
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name="soil_culture"
    )

    def __str__(self) -> str:
        return f"{self.culture} best in {self.soil}"

    class Meta:
        unique_together = (
            "soil",
            "culture",
        )


class AgriCulturePractice(models.Model):
    name = models.CharField(
        help_text="Name of the agricultural practice", max_length=255
    )
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name="agriculture_practice"
    )
    practise = models.TextField()


class CultureDiseaseAdvice(models.Model):
    culture = models.ForeignKey(
        Culture, on_delete=models.CASCADE, related_name="culture_disease_advice"
    )
    disease_name = models.CharField(max_length=255)
    solution = models.TextField()

    def __str__(self) -> str:
        return f"{self.culture} {self.disease_name}"
