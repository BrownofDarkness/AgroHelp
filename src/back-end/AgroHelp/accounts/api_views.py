from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate, logout, login
from rest_framework import status
from django.http import JsonResponse, request
from rest_framework.authtoken.models import Token
from .serializers import LoginSerializer, UserSerializer

User = get_user_model()


class LoginViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            token = user.auth_token.key
            context = {
                'Token': token,
            }
            return Response(context)
        else:
            return Response({'detail': 'email or password invalid'}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(CreateModelMixin, ListModelMixin, UpdateModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    
    def get_permissions(self):
        permission_classes = []
        if self.request.method == 'POST':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        return UserSerializer

    def get_queryset(self):
        return [self.request.user,]
    
    


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()
        Token.objects.create(user=instance)
        return Response(UserSerializer(instance).data, status=201)

    def update(self, request, *args, **kwargs):
        instance: User = self.get_object()
        user = self.get_user()
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({'detail': 'you are nor allow to update this user_profile'})

    def partial_update(self, request, *args, **kwargs):
        instance: User = self.get_object()
        user = self.get_user()
        if instance.user == user:
            return super().partial_update(request, *args, **kwargs)
        return Response({'detail': 'you are not allow to update this user_profile'})
