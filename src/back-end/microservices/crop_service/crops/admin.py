from django.contrib import admin

from .models import Culture, Soil, SoilCulture, AgriCulturePractice, CultureDiseaseAdvice
# Register your models here.


admin.site.register(Soil)


@admin.register(Culture)
class CultureAdmin(admin.ModelAdmin):

    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(SoilCulture)
class SoilCultureAdmin(admin.ModelAdmin):

    list_display = ('id', 'soil', 'culture')


@admin.register(AgriCulturePractice)
class AgriCulturePracticeAdmin(admin.ModelAdmin):

    list_display = ('id', 'culture')

    search_fields = ('cutulre__name')


@admin.register(CultureDiseaseAdvice)
class CultureDiseaseAdiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'culture', 'disease_name')
