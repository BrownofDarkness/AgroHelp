from rest_framework.routers import DefaultRouter

from . import api_views

router = DefaultRouter()
router.register('soil_area', api_views.SoilAreaViewSet, basename='soil-area')
router.register('parcel', api_views.ParcelViewSet, basename="parcel")
router.register('culture', api_views.CultureViewSet, basename="culture")

urlpatterns = router.urls
