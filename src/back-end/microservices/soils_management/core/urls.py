from rest_framework.routers import DefaultRouter

from .views import SoilAreaViewSet

router = DefaultRouter()
router.register('soil_area', SoilAreaViewSet, basename='soil-area')

urlpatterns = router.urls