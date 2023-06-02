"""
URL configuration for AgroHelp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.documentation import include_docs_urls

schema_view = get_schema_view(
    openapi.Info(
        title="AgroHelp API",
        default_version="v1",
        description="application d'aide à la décision agricole",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

admin.site.site_header = "AgroHelp Admin"
admin.site.site_title = "AgroHelp Admin"
# admin.site.site_url = "https:trix-car-backend.vercel.app"
admin.site.index_title = "AgroHelp Administration"
admin.empty_value_display = "**Empty**"

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/",
        include(
            [
                path("account/", include("accounts.api_urls")),
                path("core/", include("core.api_urls")),
                path("forum/", include("forum.urls")),
                path(
                    "docs/",
                    include(
                        [
                            re_path(
                                r"^swagger(?P<format>\.json|\.yaml)$",
                                schema_view.without_ui(cache_timeout=0),
                                name="schema-json",
                            ),
                            re_path(
                                r"^$",
                                schema_view.with_ui("swagger", cache_timeout=0),
                                name="api-docs",
                            ),
                            re_path(
                                r"^swagger/$",
                                schema_view.with_ui("swagger", cache_timeout=0),
                                name="schema-swagger-ui",
                            ),
                            re_path(
                                r"^redoc/$",
                                schema_view.with_ui("redoc", cache_timeout=0),
                                name="schema-redoc",
                            ),
                            re_path(
                                r"^default/",
                                include_docs_urls(
                                    title="AgroHelp API",
                                    description="AgroHelp Api documentation",
                                ),
                                name="default-docs",
                            ),
                        ]
                    ),
                ),
            ]
        ),
    ),
    path("api-auth/", include("rest_framework.urls"), name="api-auth"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
