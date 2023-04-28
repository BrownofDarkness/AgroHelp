from rest_framework.routers import DefaultRouter

from . import api_views

router = DefaultRouter()
router.register('soil_area', api_views.SoilAreaViewSet, basename='soil-area')

urlpatterns = router.urls
