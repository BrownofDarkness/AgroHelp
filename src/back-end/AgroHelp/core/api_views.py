from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
)
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from django.contrib.auth import get_user_model
from rest_framework import status
from django.http import JsonResponse
from django.db.models import Count
import random

from .serializers import (
    AgriculturePracticeSerializer,
    SoilSerializer,
    SoilAreaSerializer,
    ParcelSerializer,
    CultureSerializer,
    SoilSerializerCreate,
    _CultureSerializer,
    CultureDiseaseSerializer,
    FertilizerSerializer,
    CulturesIdsSerializer,
    RecommendedSerializer,
    SoilAreaSerializerCreate,
)

from .models import (
    Soil,
    SoilArea,
    Parcel,
    Culture,
    AgriculturePractice,
    CultureDiseaseAdvice,
    CultureParcel,
    Fertilizer,
)

User = get_user_model()


class SoilViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Soil.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        if self.action in ["areas"]:
            return SoilAreaSerializer
        return SoilSerializer

    @action(methods=["GET"], detail=True)
    def areas(self, request, *args, **kwargs):
        """
        This action will get retrieve all the areas where that soil is been found
        """
        instance = self.get_object()
        soil_area = SoilArea.objects.filter(soil=instance)

        return Response(
            SoilAreaSerializer(soil_area, many=True, context={"request": request}).data,
            status=200,
        )


class SoilAreaViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    def get_serializer_class(self):
        if self.request.method.upper() in ["POST", "PUT", "PATCH"]:
            return SoilAreaSerializerCreate

        return SoilAreaSerializer

    queryset = SoilArea.objects.all()


class ParcelViewSet(
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    GenericViewSet,
):
    # serializer_class = ParcelSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "add_cultures":
            return CulturesIdsSerializer

        return ParcelSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Parcel.objects.filter(
            user=user.id
        )  # .distinct('cultures__culture__name')
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(
            {"data": ParcelSerializer(instance).data, "success": True}, status=201
        )

    def update(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({"detail": "you are not allowed to update this parcel"})

    def delete(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().delete(request, *args, **kwargs)
        return JsonResponse({"detail": "you are not allowed to delete this parcel"})

    @action(methods=["GET"], detail=True)
    def suggest_culture(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()

        soils = Soil.objects.filter(areas__polygon__intersects=instance.location)
        cultures = Culture.objects.filter(soil_culture__soil__in=soils)
        # return Response(SoilSerializer(soils, many=True).data)
        return Response(
            _CultureSerializer(cultures, many=True, context={"request": request}).data
        )

    @action(methods=["POST"], detail=True)
    def add_cultures(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        serializer = CulturesIdsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cultures = serializer.validated_data["ids"]

        if instance.user == request.user:
            for culture in cultures:
                try:
                    CultureParcel.objects.create(culture=culture, parcel=instance)
                except:
                    pass
            return Response(
                {"message": f"Culture added successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response({"detail": "Not Allow"}, status=status.HTTP_403_FORBIDDEN)


class CultureViewSet(
    DestroyModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    GenericViewSet,
):
    def get_serializer_class(self):
        if self.action in ["list", "me", "retrieve"]:
            return CultureSerializer
        elif self.action in ["diseases"]:
            return CultureDiseaseSerializer
        elif self.action in ["practise"]:
            return AgriculturePracticeSerializer
        elif self.action in ["favorable_areas"]:
            return SoilAreaSerializer
        elif self.action in ["recommended"]:
            return RecommendedSerializer
        else:
            return CultureSerializer

    # serializer_class = CultureSerializer

    def get_permissions(self):
        if self.request.method.upper() in ["POST", "PUT", "PATCH"]:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return Culture.objects.all()

    @action(methods=["get"], detail=False)
    def me(self, request):
        # From this `me` action i will gtet all the cultures that a user practise
        instance = Culture.objects.filter(parcel__parcel__user=self.request.user)
        # instance = self.get_object()
        return Response(CultureSerializer(instance, many=True).data)

    def update(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({"detail": "you are not allowed to update this culture"})

    def delete(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().delete(request, *args, **kwargs)
        return JsonResponse({"detail": "you are not allowed to delete this culture"})

    @action(methods=["GET"], detail=True)
    def practise(self, request, *args, **kwargs):
        instance = self.get_object()
        practises = AgriculturePractice.objects.filter(culture=instance)

        return Response(AgriculturePracticeSerializer(practises, many=True).data)

    @action(methods=["GET"], detail=True)
    def diseases(self, request, *args, **kwargs):
        instance = self.get_object()
        practises = CultureDiseaseAdvice.objects.filter(culture=instance)

        return Response(CultureDiseaseSerializer(practises, many=True).data)

    @action(methods=["GET"], detail=True)
    def favorable_areas(self, request, *args, **kwargs):
        """
        This function will get the areas suitable for a crop to grow
        """
        instance = self.get_object()
        culture_areas = SoilArea.objects.filter(soil__soil_culture__culture=instance)
        return Response(SoilAreaSerializer(culture_areas, many=True).data)

    @action(methods=["GET"], detail=True)
    def fertilizers(self, request, *args, **kwargs):
        instance = self.get_object()
        fertislizers = Fertilizer.objects.filter(culture_fertilizer__culture=instance)
        return Response(FertilizerSerializer(fertislizers, many=True).data)

    @action(methods=["GET"], detail=False)
    def populars(self, request, *args, **kwargs):
        popular_cultures = Culture.objects.annotate(
            num_parcels=Count("parcel")
        ).order_by("-num_parcels")

        return Response(
            CultureSerializer(
                popular_cultures[: random.randrange(10, 20)],
                many=True,
                context={"request": request},
            ).data
        )

    @action(methods=["GET"], detail=False)
    def recommended(self, request, *args, **kwargs):
        recomended_cultures = []
        parcels = Parcel.objects.filter(user=request.user.id)

        for parcel in parcels:
            soils = Soil.objects.filter(areas__polygon__intersects=parcel.location)
            cultures = Culture.objects.filter(soil_culture__soil__in=soils)
            _cultures = _CultureSerializer(
                cultures, many=True, context={"request": request}
            ).data
            for _c in _cultures:
                recomended_cultures.append(_c)

        """
        The function below simply remove the duplicates in the a list
        """
        seen = set()
        unique_recomended_cultures = [
            dict_
            for dict_ in recomended_cultures
            if not (dict_["id"] in seen or seen.add(dict_["id"]))
        ]
        """
        The output data will have the form
        ```json
        {
            culture:{
                ...
            },
            favorite:false
        }
        ```
        """

        results = []

        for culture in unique_recomended_cultures:
            """
            Here i will check if a user practise this culture
            """
            # favorite = Culture.objects.filter(
            #     Q(parcel__culture__id=culture["id"]) & Q(parcel__parcel__in=parcels)
            # ).exists()
            favorite = Culture.objects.filter(
                parcel__culture__id=culture["id"], parcel__parcel__in=parcels
            ).exists()
            data = {"culture": culture, "favorite": favorite}

            results.append(data)

        return Response(results)


class CulturePractiseViewSet(
    DestroyModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Here i will get the agricultural practise for a given culture passed in the
        # query parameter as
        culture = self.request.query_params.get("culture", None)
        if self.request.query_params.get("culture"):
            culture = Culture.objects.filter(name=culture)
        return AgriculturePractice.objects.all()


class FertilizerViewSet(ModelViewSet, GenericViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Fertilizer.objects.all()

    serializer_class = FertilizerSerializer
