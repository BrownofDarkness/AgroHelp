from django.apps import AppConfig


class CropsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "crops"

    def ready(self) -> None:
        from . import signals

        return super().ready()
