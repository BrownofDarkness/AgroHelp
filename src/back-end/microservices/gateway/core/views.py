from django.shortcuts import render

from rest_framework.views import APIView

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView

from rest_framework.response import Response

from rest_framework.viewsets import GenericViewSet

from django.conf import settings

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

import requests

from .serializers import (UserSerializer, LoginSerializer, SuccessSerializer,
                          TokenSerializer, PasswordResetSerializer, UpdatePasswordSerializer)

# Create your views here.


class LoginView(APIView):

    serializer_class = LoginSerializer

    @swagger_auto_schema(request_body=LoginSerializer, responses={status.HTTP_200_OK: openapi.Response('Authentication Response', TokenSerializer)})
    def post(self, request, *args, **kwargs):
        data = request.data
        response = requests.post(
            f"{settings.ACCOUNT_SERVICE}/api/account/auth/", data=data)
        return Response(response.json(), status=response.status_code)


class UserViewList(APIView):
    serializer_class = UserSerializer

    @swagger_auto_schema(responses={200: openapi.Response('User Response', UserSerializer)})
    def get(self, request, *args, **kwargs):
        token = request.headers.get('Authorization')
        print(f"{settings.ACCOUNT_SERVICE}/api/account/user/")
        response = requests.get(
            f"{settings.ACCOUNT_SERVICE}/api/account/user/", headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)

    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request, *args, **kwargs):
        token = request.headers.get('Authorization')
        data = request.data
        response = requests.post(
            f"{settings.ACCOUNT_SERVICE}/api/account/user/", data=data, headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)


class UserViewDetail(APIView):
    serializer_class = UserSerializer

    @swagger_auto_schema(responses={200: openapi.Response('User Response', UserSerializer)})
    def get(self, request, pk, *args, **kwargs):
        print(pk)
        token = request.headers.get('Authorization')
        response = requests.get(
            f"{settings.ACCOUNT_SERVICE}/api/account/user/{pk}", headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)

    @swagger_auto_schema(responses={200: openapi.Response('User Response', UserSerializer)})
    def patch(self, request, pk, *args, **kwargs):
        token = request.headers.get('Authorization')
        data = request.data
        response = requests.patch(
            f"{settings.ACCOUNT_SERVICE}/api/account/user/{pk}", data=data, headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)

    @swagger_auto_schema(responses={200: openapi.Response('User Response', UserSerializer)})
    def put(self, request, pk, *args, **kwargs):
        token = request.headers.get('Authorization')
        data = request.data
        response = requests.put(
            f"{settings.ACCOUNT_SERVICE}/api/account/user/{pk}", data=data, headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)

    @swagger_auto_schema(responses={status.HTTP_204_NO_CONTENT: 'Content Not Found'})
    def delete(self, request, pk, *args, **kwargs):
        token = request.headers.get('Authorization')
        response = requests.delete(
            f"{settings.ACCOUNT_SERVICE}/api/account/user/{pk}", headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)


class ValidateTokenView(APIView):

    def post(self, request, *args, **kwargs):
        token = request.headers.get('Authorization')
        data = request.data
        response = requests.post(
            f"{settings.ACCOUNT_SERVICE}/api/account/validate-token/", data=data, headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)


class ResetPasswordView(APIView):
    @swagger_auto_schema(request_body=PasswordResetSerializer, responses={status.HTTP_200_OK: openapi.Response('Authentication Response', SuccessSerializer)})
    def post(self, request, *args, **kwargs):
        token = request.headers.get('Authorization')
        data = request.data
        response = requests.post(
            f"{settings.ACCOUNT_SERVICE}/api/account/reset-password/", data=data, headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)


class UpdatePasswordView(APIView):
    @swagger_auto_schema(request_body=UpdatePasswordSerializer, responses={status.HTTP_200_OK: openapi.Response('Authentication Response', SuccessSerializer)})
    def post(self, request, *args, **kwargs):
        token = request.headers.get('Authorization')
        data = request.data
        response = requests.post(
            f"{settings.ACCOUNT_SERVICE}/api/account/updated-password/", data=data, headers={'Authorization': token})
        return Response(response.json(), status=response.status_code)
