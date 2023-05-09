# from django.contrib import admin
from django.contrib.gis import admin
from .models import Soil, SoilArea, SoilCulture
from leaflet.admin import LeafletGeoAdmin

from django.contrib import admin

from .serializers import _SoilSerializer

# Register your models here.


@admin.action(description="Notify Culture Service")
def make_published(modeladmin, request, queryset):
    try:
        from .producer import publish

        for soil in queryset:
            publish("soil_created", _SoilSerializer(soil).data)
    except:
        pass


@admin.register(Soil)
class SoilAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "composition")
    search_fields = ("type",)
    actions = [make_published]


@admin.register(SoilCulture)
class SoilCultureAdmin(admin.ModelAdmin):
    list_display = ("soil", "culture")


@admin.register(SoilArea)
class SoilAreaAdmin(LeafletGeoAdmin):
    map_height = "1000px"
    map_width = "min(calc(250vw - 30px),2000px)"
    list_display = ("id", "soil", "polygon")
