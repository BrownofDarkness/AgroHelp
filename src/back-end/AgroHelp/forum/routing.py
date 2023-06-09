from django.urls import re_path
from . import consumers


websocket_urpatterns = [
    re_path(
        r"ws/forum_chat/(?P<forum_id>[0-9]+)/$",
        consumers.ForumConsumer.as_asgi(),
    )
]
