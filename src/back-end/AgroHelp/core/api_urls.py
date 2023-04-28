<<<<<<< HEAD
from rest_framework.routers import DefaultRouter

from . import api_views

router = DefaultRouter()
router.register('soil_area', api_views.SoilAreaViewSet, basename='soil-area')

urlpatterns = router.urls
=======
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('client', ClientViewSet, basename='client')

urlpatterns = router.urls
>>>>>>> 3880fc5a3bb04beaa287ce7d4a83ca7be2edc793
