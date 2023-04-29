
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Soil, SoilArea, Culture, SoilCulture, Parcel, CultureParcel
from rest_framework import serializers as sz
from rest_framework_gis import serializers


class ParcelSerializer(serializers.GeoModelSerializer):

    class Meta:
        model = Parcel
        geo_field = 'location'
        fields = '__all__'


class SoilSerializer(sz.ModelSerializer):

    composition = sz.SerializerMethodField()

    class Meta:
        model = Soil
        fields = '__all__'

    def get_composition(self, soil: Soil):

        return soil.composition.split('|')


class CultureSerializer(sz.ModelSerializer):

    soils = sz.SerializerMethodField()

    class Meta:
        model = Culture
        fields = '__all__'

    def get_soils(self, obj: Culture):
        # Here i would get all the soil that are favorable for this culture

        queryset = Soil.objects.filter(soil_culture__soil=obj)

        return SoilSerializer(queryset, many=True).data


class SoilAreaSerializer(serializers.GeoFeatureModelSerializer):

    soil = SoilSerializer()

    class Meta:
        model = SoilArea
        geo_field = 'polygon'
        fields = ('soil', 'polygon')
