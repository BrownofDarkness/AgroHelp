from rest_framework import serializers

from ..models import Culture, AgriCulturePractice, CultureDiseaseAdvice, Soil


class _CultureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Culture
        fields = "__all__"


class _SoilSerializer(serializers.ModelSerializer):
    composition = serializers.SerializerMethodField()

    class Meta:
        model = Soil
        fields = "__all__"

    def get_composition(self, obj: Soil):
        return obj.description.split("|")


class SoilSerializer(serializers.ModelSerializer):
    cultures = serializers.SerializerMethodField()

    class Meta:
        model = Soil
        fields = "__all__"

    def get_cultures(self, obj: Soil):
        # Here i would get all the soil that are favorable for this culture

        queryset = Soil.objects.filter(soil_culture__soil=obj)

        return _SoilSerializer(queryset, many=True).data


class CultureSerializer(serializers.ModelSerializer):
    soils = serializers.SerializerMethodField()

    class Meta:
        model = Culture
        fields = "__all__"

    def get_soils(self, obj: Culture):
        query_set = Soil.objects.filter(soil_culture__culture=obj)

        return _CultureSerializer(query_set, many=True).data


class CultureDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CultureDiseaseAdvice
        # fields = '__all__'
        exclude = ("culture",)


class CultureWithPracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgriCulturePractice

        exclude = ("culture",)
