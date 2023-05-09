from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from auth.permissions import TokenPermission
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from rest_framework import status
from django.http import JsonResponse, request
from rest_framework.authtoken.models import Token


from .serializers import ParcelSerializer
from .models import Parcel, CultureParcel


# Create your views here.

class ParcelViewSet(CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = ParcelSerializer
    # permission_classes = [TokenPermission]

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