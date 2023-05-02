from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('culture', views.CropViewSet, basename='culture')
router.register('')
