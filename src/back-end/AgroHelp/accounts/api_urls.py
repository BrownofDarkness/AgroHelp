from rest_framework.routers import DefaultRouter
from .api_views import UserViewSet, LoginViewSet

router = DefaultRouter()
router.register('user', UserViewSet, basename='client')
router.register('auth', LoginViewSet, basename='login')

urlpatterns = router.urls