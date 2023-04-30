from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate, logout, login
from rest_framework import status
from django.http import JsonResponse, request
from rest_framework.authtoken.models import Token


from .seializers import SoilSerializer, SoilAreaSerializer, ParcelSerializer, CultureSerializer
from .models import Soil, SoilArea, Parcel, Culture, SoilCulture, AgriculturePractice

User = get_user_model()


class SoilAreaViewSet(CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin, GenericViewSet):

    serializer_class = SoilAreaSerializer

    queryset = SoilArea.objects.all()


class ParcelViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = ParcelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Parcel.objects.filter(user=user.id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response({"data":ParcelSerializer(instance).data,"success":True}, status=201)

    def update(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({'detail': 'you are not allowed to update this parcel'})

    def delete(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().delete(request, *args, **kwargs)
        return JsonResponse({'detail': 'you are not allowed to delete this parcel'})


class CultureViewSet(DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = CultureSerializer

    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'PUT' or self.request.method == 'DELETE' or self.request.method == 'PATCH':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        # 
        id = self.request.id
        soil_cult = SoilCulture.objects.filter(soil=id)
        queryset = []
        for item in soil_cult:
            queryset.append(Culture.objects.get(id=item.culture.id))

        return queryset

    @action(methods=['get'], detail=True)
    def me(self, request):
        instance = self.get_object()
        return Response(CultureSerializer(instance).data)

    def update(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({'detail': 'you are not allowed to update this parcel'})

    def delete(self, request, *args, **kwargs):
        instance: Parcel = self.get_object()
        user = self.request.user
        if instance.user == user:
            return super().delete(request, *args, **kwargs)
        return JsonResponse({'detail': 'you are not allowed to delete this parcel'})


class CulturePractiseViewSet(DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Here i will get the agricultural practise for a given culture passed in the
        # query parameter as
        culture = self.request.query_params.get('culture', None)
        if self.request.query_params.get('culture'):
            culture = Culture.objects.filter(name=culture)
        return AgriculturePractice.objects.all()
