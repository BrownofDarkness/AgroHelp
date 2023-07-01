<<<<<<< HEAD:src/back-end/microservices/crop_service/crops/apps.py
from django.apps import AppConfig


class CropsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "crops"

    def ready(self) -> None:
        from . import signals

        return super().ready()
=======
from django.apps import AppConfig


class ForumConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "forum"

    def ready(self) -> None:
        from . import signals
>>>>>>> 70dc21cd0cc012ffc8d5c77c8b2464ea0dd1ef9b:src/back-end/microservices/forum_service/forum/apps.py
