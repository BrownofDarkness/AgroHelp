from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
)
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
)
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import status
from django.http import JsonResponse
from .serializers import (
    LoginSerializer,
    UserSerializer,
    UpdatePasswordSerializer,
    PasswordResetSerializer,
)
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView

User = get_user_model()


class LoginViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = LoginSerializer
    permission_classes = [
        AllowAny,
    ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get("email")
        password = serializer.validated_data.get("password")
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            token = user.auth_token.key
            context = {"token": token, "user": UserSerializer(user).data}
            return Response(context)
        else:
            return Response(
                {"detail": "email or password invalid"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserViewSet(
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    GenericViewSet,
):
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method.upper() == "POST":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == "update_password":
            return UpdatePasswordSerializer
        return UserSerializer

    def get_queryset(self):
        return [
            self.request.user,
        ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()
        return Response(UserSerializer(instance).data, status=201)

    def update(self, request, *args, **kwargs):
        instance: User = self.get_object()
        user = self.get_user()
        if instance.user == user:
            return super().update(request, *args, **kwargs)
        return JsonResponse({"detail": "you are nor allow to update this user_profile"})

    def partial_update(self, request, *args, **kwargs):
        instance: User = self.get_object()
        user = self.get_user()
        if instance.user == user:
            return super().partial_update(request, *args, **kwargs)
        return Response({"detail": "you are not allow to update this user_profile"})

    @action(methods=["POST"], detail=True)
    def update_password(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not request.user.check_password(old_password):
            return Response(
                {"success": False, "message": "old password don't match"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(new_password) < 8:
            return Response(
                {
                    "success": False,
                    "message": "password is too short require atleast 8 characters",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if new_password != confirm_password:
            return Response(
                {"success": False, "message": "password don't match"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user
        user.set_password(new_password)
        user.save()

        if user.check_password(new_password):
            return Response(
                {"message": "password updated successfully", "success": True},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "Something went wrong", "success": False},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ResetPasswordView(GenericViewSet, CreateAPIView):
    permission_classes = [AllowAny]

    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response({"success": True})


class UpdatePasswordViewSet(GenericViewSet, CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdatePasswordSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not request.user.check_password(old_password):
            return Response(
                {"success": False, "message": "old password don't match"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(new_password) < 8:
            return Response(
                {
                    "success": False,
                    "message": "password is too short require atleast 8 characters",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if new_password != confirm_password:
            return Response(
                {"success": False, "message": "password don't match"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user
        user.set_password(new_password)
        user.save()

        if user.check_password(new_password):
            return Response(
                {"message": "password updated successfully", "success": True},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "Something went wrong", "success": False},
                status=status.HTTP_400_BAD_REQUEST,
            )
