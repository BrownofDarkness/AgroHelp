
from rest_framework_gis import serializers
from .models import Parcel

class ParcelSerializer(serializers.GeoModelSerializer):

    class Meta:
        model = Parcel
        geo_field = 'location'
        fields = '__all__'

