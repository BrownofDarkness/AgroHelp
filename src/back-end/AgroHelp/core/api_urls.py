from rest_framework.routers import DefaultRouter

from . import api_views

router = DefaultRouter()
router.register("soil", api_views.SoilViewSet, basename="soil")
router.register("soil_area", api_views.SoilAreaViewSet, basename="soil-area")
router.register("parcel", api_views.ParcelViewSet, basename="parcel")
router.register("culture", api_views.CultureViewSet, basename="culture")
router.register("fertilizer", api_views.FertilizerViewSet, basename="fertilizer")
router.register("search", api_views.SearchViewSet, basename="search")

urlpatterns = router.urls
