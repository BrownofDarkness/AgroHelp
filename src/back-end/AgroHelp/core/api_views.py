from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin, ListModelMixin, UpdateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny,IsAuthenticatedOrReadOnly
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model, authenticate, logout, login
from rest_framework import status
from django.http import JsonResponse, request
from rest_framework.authtoken.models import Token

User = get_user_model()