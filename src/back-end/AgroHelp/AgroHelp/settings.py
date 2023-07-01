"""
Django settings for AgroHelp project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

import environ
import os,dj_database_url
from getenv import env

# env = environ.Env()

# environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-vhz^!-xkq3vq8o&z+^lk^=r#c^a_$d=t8g@4#!fqi&#_ir4i%9"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*",'agrohelp-6cl9.onrender.com']

CSRF_TRUSTED_ORIGINS = ["https://agrohelp-6cl9.onrender.com"]

# Application definition

INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.gis",  # GeoDjango,
    # Third party apps
    "drf_yasg",
    "corsheaders",
    "rest_framework",
    "rest_framework_gis",
    "rest_framework.authtoken",
    "leaflet",
    # Local Apps
    "core",
    "accounts",
    "forum",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "AgroHelp.urls"

AUTH_USER_MODEL = "accounts.User"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "AgroHelp.wsgi.application"
ASGI_APPLICATION = "AgroHelp.asgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     "default": {
#         # 'ENGINE': 'django.db.backends.sqlite3',
#         "ENGINE": "django.contrib.gis.db.backends.spatialite",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        'NAME': env("DB_NAME","agrohelp"),
        'USER': env("DB_USER","ivantom"),
        'PASSWORD': env("DB_PASSWORD","MXqzID300C3vorou1eFAFXtSwFsVXOtf"),
        'HOST': env("DB_HOST","dpg-ciek9d5gkuvlk1ghub50-a"),
        'PORT': env("DB_PORT",5432),
    }
}
# DATABASES ={
#     "default": dj_database_url.parse(
#         env("DB_URL",os.getenv("DB_URL")),
#         conn_max_age=600,
#         conn_health_checks=True,
#     )
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"
MEDIA_URL = "/medias/"

# Dossier où seront stockés les médias
MEDIA_ROOT = BASE_DIR / "medias"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Cors configurations

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]

# REST FRAMEWORK CONFIGURATIONS

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        
        # "rest_framework.authentication.BasicAuthentication",
    ),
    "DEFAULT_PERMISSIONS_CLASSES": ("rest_framework.permissions.IsAuthenticated"),
    # 'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    "DEFAULT_SCHEMA_CLASS": "rest_framework_gis.schema.GeoFeatureAutoSchema",
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

REDOC_SETTINGS = {
    "LAZY_RENDERING": False,
}

# Celery

# CELERY_BROKER_URL = "redis://redis:6397"
CELERY_BROKER_URL = "redis://localhost:6379/0"

# CELERY_RESULT_BACKEND = "redis://redis:6397"
CELERY_RESULT_BACKEND = "redis://localhost:6379/0"

CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_TIMEZONE = "UTC"
CELERY_TASK_REJECT_ON_WORKER_LOST = True
CELERY_TASK_TRACK_STARTED = True
CELERY_ACKS_LATE = True
CELERY_WORKER_SEND_TASK_EVENTS = True
CELERY_TASK_SEND_SENT_EVENT = True
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"


# With Redis

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": ["redis://redis:6379/0"]
#             # "hosts": [("127.0.0.1", 6379)],
#         },
#     },
# }


# With internal memoryChannelLayer
if DEBUG:
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "channels.layers.InMemoryChannelLayer",
        }
    }

# Leaflet configurations

LEAFLET_CONFIG = {
    "DEFAULT_CENTER": (3.866667, 11.516667),
    "DEFAULT_ZOOM": 5,
    "ATTRIBUTION_PREFIX": '<a target="_blank" href="https://github.com/tomdieu">Powered By ivantom</a>',
}
