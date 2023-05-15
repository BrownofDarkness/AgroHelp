# from django.contrib import admin
from django.contrib.gis import admin

from leaflet.admin import LeafletGeoAdmin

from .models import (
    Culture,
    Soil,
    SoilArea,
    CultureParcel,
    Parcel,
    SoilCulture,
    CultureDiseaseAdvice,
    AgriculturePractice,
    Fertilizer,
    CultureFilizer,
)

# Register your models here.


@admin.register(Culture)
class CultureAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "photo_preview")
    search_fields = ("name",)

    readonly_fields = ["photo_preview"]


@admin.register(Soil)
class SoilAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "composition")
    search_fields = ("type",)


@admin.register(SoilCulture)
class SoilCultureAdmin(admin.ModelAdmin):
    list_display = ("soil", "culture")


@admin.register(Parcel)
class ParcelAdmin(LeafletGeoAdmin):
    list_display = ("id", "user", "location", "area", "name")


@admin.register(CultureParcel)
class CultureParcelAdmin(admin.ModelAdmin):
    list_display = ("id", "culture", "parcel")


@admin.register(SoilArea)
class SoilAreaAdmin(LeafletGeoAdmin):
    map_height = "1000px"
    map_width = "min(calc(250vw - 30px),2000px)"
    list_display = ("id", "soil", "polygon")


@admin.register(AgriculturePractice)
class AgriculturalPractiseAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "culture", "practise"]
    search_fields = ["name", "culture__name", "practise"]
    list_filter = ["culture"]


@admin.register(CultureDiseaseAdvice)
class CultureDiseaseAdviceAdmin(admin.ModelAdmin):
    list_display = ["id", "culture", "disease_name", "image_preview"]


@admin.register(Fertilizer)
class FertilizerAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "composition", "type"]


@admin.register(CultureFilizer)
class CultureFilizerAdmin(admin.ModelAdmin):
    list_display = ["fertilizer", "culture"]
