from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import (
    Soil,
    SoilArea,
    Culture,
    SoilCulture,
    Parcel,
    CultureParcel,
    AgriculturePractice,
    CultureDiseaseAdvice,
)
from rest_framework import serializers as sz
from rest_framework_gis import serializers


class _CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = "__all__"


class ParcelSerializer(serializers.GeoModelSerializer):
    culture = sz.SerializerMethodField()

    class Meta:
        model = Parcel
        geo_field = "location"
        fields = "__all__"

    def get_culture(self, obj: Parcel):
        culture = Culture.objects.get(parcel__parcel=obj)
        if culture:
            return _CultureSerializer(
                culture, context={"request": self.context["request"]}
            ).data
        return None


class SoilSerializer(sz.ModelSerializer):
    composition = sz.SerializerMethodField()

    class Meta:
        model = Soil
        fields = "__all__"

    def get_composition(self, soil: Soil):
        return soil.composition.split("|")


class CultureSerializer(sz.ModelSerializer):
    soils = sz.SerializerMethodField()

    class Meta:
        model = Culture
        fields = "__all__"

    def get_soils(self, obj: Culture):
        # Here i would get all the soil that are favorable for this culture

        queryset = Soil.objects.filter(soil_culture__culture=obj)

        return SoilSerializer(queryset, many=True).data


class SoilAreaSerializer(serializers.GeoFeatureModelSerializer):
    soil = SoilSerializer()

    class Meta:
        model = SoilArea
        geo_field = "polygon"
        fields = ("soil", "polygon")


class AgriculturePracticeSerializer(serializers.ModelSerializer):
    culture = _CultureSerializer()

    class Meta:
        model = AgriculturePractice
        fields = "__all__"
        # exclude = ("culture",)


class CultureDiseaseSerializer(serializers.ModelSerializer):
    culture = _CultureSerializer()

    class Meta:
        model = CultureDiseaseAdvice
        fields = "__all__"
        # exclude = ("culture",)


class CultureIDSerializer(sz.Serializer):
    id = sz.IntegerField()

    def validated_id(self, value):
        cultures = Culture.objects.filter(id=value)
        if cultures:
            return cultures.first()
        raise sz.ValidationError({"id": f"The culture with id {value} does not exist!"})
