# from django.urls import path
from rest_framework.routers import DefaultRouter

from django.urls import path, include

from . import views


urlpatterns = [
    path('auth/', views.LoginView.as_view()),
    path('account/', include([
        path('user/', views.UserViewList.as_view()),
        path('user/<int:pk>/', views.UserViewDetail.as_view()),
        path('validate-token/', views.ValidateTokenView.as_view()),
        path('reset-password/', views.ResetPasswordView.as_view()),
        path('updated-password/', views.UpdatePasswordView.as_view()),

    ]))
]
