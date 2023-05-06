from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('culture', views.CropViewSet, basename='culture')
router.register('culture-practise',views.CultureWithPracticeViewSet,basename='culture-practise')
router.register('culture-disease',views.CultureDiseaseAdviceViewSet,basename='culture-disease')


urlpatterns = []

urlpatterns += router.urls
