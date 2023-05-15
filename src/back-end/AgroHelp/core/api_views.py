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
    AllowAny,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
)
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate, logout, login
from rest_framework import status
from django.http import JsonResponse, request
from rest_framework.authtoken.models import Token


from .serializers import (
    AgriculturePracticeSerializer,
    SoilSerializer,
    SoilAreaSerializer,
    ParcelSerializer,
    CultureSerializer,
    _CultureSerializer,
    CultureIDSerializer,
    CultureDiseaseSerializer,
    FertilizerSerializer,
)
from .models import (
    Soil,
    SoilArea,
    Parcel,
    Culture,
    SoilCulture,
    AgriculturePractice,
    CultureDiseaseAdvice,
    CultureParcel,
    Fertilizer,
)

User = get_user_model()


class SoilAreaViewSet(
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    GenericViewSet,
):
    serializer_class = SoilAreaSerializer

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
        if self.action == "set_culture":
            return CultureIDSerializer
        return ParcelSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Parcel.objects.filter(user=user.id)
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
    def set_culture(self, request, pk, *args, **kwargs):
        instance: Parcel = self.get_object()
        serializer = CultureIDSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        culture = serializer.validated_data["id"]
        if instance.user == request.user:
            CultureParcel.objects.create(culture_id=culture, parcel=instance)
            return Response(status=status.HTTP_201_CREATED)
        return Response("OK", status=status.HTTP_403_FORBIDDEN)


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
        else:
            return CultureSerializer

    # serializer_class = CultureSerializer

    def get_permissions(self):
        if self.request.method.upper() in ['POST', 'PUT', 'PATCH']:
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
        return JsonResponse({"detail": "you are not allowed to update this parcel"})

    def delete(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().delete(request, *args, **kwargs)
        return JsonResponse({"detail": "you are not allowed to delete this parcel"})

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
