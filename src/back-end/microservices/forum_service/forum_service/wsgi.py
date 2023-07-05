<<<<<<< HEAD:src/back-end/microservices/crop_service/crop_service/wsgi.py
"""
WSGI config for crop_service project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crop_service.settings')

application = get_wsgi_application()
=======
"""
WSGI config for forum_service project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'forum_service.settings')

application = get_wsgi_application()
>>>>>>> 70dc21cd0cc012ffc8d5c77c8b2464ea0dd1ef9b:src/back-end/microservices/forum_service/forum_service/wsgi.py
