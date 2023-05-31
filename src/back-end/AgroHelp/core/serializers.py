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
    Fertilizer,
)
from rest_framework import serializers as sz
from rest_framework_gis import serializers


class _CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = "__all__"


class ParcelSerializer(serializers.GeoModelSerializer):
    cultures = sz.SerializerMethodField()

    class Meta:
        model = Parcel
        geo_field = "location"
        fields = "__all__"

    def get_cultures(self, obj: Parcel):
        cultures = Culture.objects.filter(parcel__parcel=obj)
        if cultures:
            return _CultureSerializer(
                cultures, many=True, context={"request": self.context["request"]}
            ).data
        return None


class _SoilAreaSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = SoilArea
        geo_field = "polygon"
        fields = ["polygon"]


class SoilDetailSerializer(sz.ModelSerializer):
    composition = sz.SerializerMethodField()

    cultures = sz.SerializerMethodField()

    areas = sz.SerializerMethodField()

    class Meta:
        model = Soil
        fields = "__all__"

    def get_composition(self, soil: Soil):
        return soil.composition.split("|")

    def get_cultures(self, soil: Soil):
        return _CultureSerializer(
            Culture.objects.filter(soil_culture__soil=soil), many=True
        ).data

    def get_areas(self, soil: Soil):
        return _SoilAreaSerializer(SoilArea.objects.filter(soil=soil), many=True).data


class SoilSerializer(sz.ModelSerializer):
    composition = sz.SerializerMethodField()

    cultures = sz.SerializerMethodField()

    class Meta:
        model = Soil
        fields = "__all__"

    def get_composition(self, soil: Soil):
        return soil.composition.split("|")

    def get_cultures(self, soil: Soil):
        return _CultureSerializer(
            Culture.objects.filter(soil_culture__soil=soil), many=True
        ).data


class SoilSerializerCreate(sz.ModelSerializer):
    class Meta:
        model = Soil
        fields = "__all__"


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


class SoilAreaSerializerCreate(serializers.GeoFeatureModelSerializer):
    class Meta:
        model = SoilArea
        geo_field = "polygon"
        fields = ("soil", "polygon")


class AgriculturePracticeSerializer(serializers.ModelSerializer):

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


class CulturesIdsSerializer(sz.Serializer):
    ids = serializers.ListSerializer(child=sz.IntegerField())

    def validate_ids(self, value: list):
        _cultures = []
        print("Values : ", value)
        for _id in value:
            cultures = Culture.objects.filter(id=int(_id))
            print("Cultures ", cultures)
            if cultures.exists():
                _cultures.append(cultures.first())
            else:
                raise sz.ValidationError(f"The culture with id {_id} does not exist!")

        return _cultures


class FertilizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilizer
        fields = "__all__"


class RecommendedSerializer(sz.Serializer):
    culture = _CultureSerializer()
    favorite = sz.BooleanField()
