# from django.contrib import admin
from django.contrib.gis import admin

from leaflet.admin import LeafletGeoAdmin

from .models import CultureParcel, Parcel

# Register your models here.

@admin.register(Parcel)
class ParcelAdmin(LeafletGeoAdmin):
    list_display = ('id', 'user', 'location', 'area', 'name')
    
@admin.register(CultureParcel)
class CultureParcelAdmin(admin.ModelAdmin):
    list_display = ('id', 'culture', 'parcel')