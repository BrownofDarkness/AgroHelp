from django.contrib import admin

from .models import (
    Culture,
    Soil,
    SoilCulture,
    AgriCulturePractice,
    CultureDiseaseAdvice,
)

# Register your models here.


admin.site.register(Soil)


class AgriculturePracticeInlineAdmin(admin.TabularInline):
    model = AgriCulturePractice
    extra = 0
    raw_id_fields = ["culture"]


class CultureDiseaseInlineAdmin(admin.TabularInline):
    model = CultureDiseaseAdvice
    extra = 0
    raw_id_fields = ["culture"]


@admin.register(Culture)
class CultureAdmin(admin.ModelAdmin):
    readonly_fields = ["image_preview"]
    list_display = ("id", "name", "image_preview")
    search_fields = ("name",)

    inlines = [AgriculturePracticeInlineAdmin, CultureDiseaseInlineAdmin]


@admin.register(SoilCulture)
class SoilCultureAdmin(admin.ModelAdmin):
    raw_id_fields = ["soil", "culture"]
    list_display = ("id", "soil", "culture")


@admin.register(AgriCulturePractice)
class AgriCulturePracticeAdmin(admin.ModelAdmin):
    list_display = ("id", "culture")
    raw_id_fields = ["culture"]

    search_fields = ("cutulre__name",)


@admin.register(CultureDiseaseAdvice)
class CultureDiseaseAdiceAdmin(admin.ModelAdmin):
    list_display = ("id", "culture", "disease_name")
    raw_id_fields = ["culture"]
