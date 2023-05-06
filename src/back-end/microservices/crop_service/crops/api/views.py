from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.viewsets import GenericViewSet
from rest_framework import status

from ..models import (
    Culture,
    SoilCulture,
    Soil,
    AgriCulturePractice,
    CultureDiseaseAdvice,
)

from auth.permissions import TokenPermission

from rest_framework.decorators import action

from rest_framework.response import Response

from .serializers import (
    CultureSerializer,
    CultureDiseaseSerializer,
    CultureWithPracticeSerializer,
)


class CropViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = CultureSerializer
    # permission_classes = [TokenPermission]

    queryset = Culture.objects.all()
    lookup_field = "id"

    @action(methods=["GET"], detail=True)
    def practise(self, request, *args, **kwargs):
        print(args, "::", kwargs)
        instance = self.get_object()
        practise = AgriCulturePractice.objects.filter(culture=instance)

        return Response(CultureWithPracticeSerializer(practise, many=True).data)

    @action(methods=["GET"], detail=True)
    def disease(self, request, *args, **kwargs):
        instance = self.get_object()
        disease = CultureDiseaseAdvice.objects.filter(culture=instance)
        return Response(CultureDiseaseSerializer(disease, many=True).data)


class CultureWithPracticeViewSet(
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet
):
    serializer_class = CultureWithPracticeSerializer
    # permission_classes = [TokenPermission]

    def get_queryset(self):
        queryset = AgriCulturePractice.objects.all()
        return queryset


class CultureDiseaseAdviceViewSet(
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, GenericViewSet
):
    serializer_class = CultureDiseaseSerializer
    # permission_classes = [TokenPermission]

    queryset = CultureDiseaseAdvice.objects.all()
