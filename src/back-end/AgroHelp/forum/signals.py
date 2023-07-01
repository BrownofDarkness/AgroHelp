from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Forum, ForumComment

from .serializers import ForumCommentSerializer, ForumSerializer, ForumListSerializer,ForumCommentListSerializer


@receiver(post_save, sender=Forum)
def notify_all_farmers_on_new_forum(sender, instance, created, **kwargs):
    if created:
        from channels.layers import get_channel_layer
        from asgiref.sync import async_to_sync
        import asyncio
        import json

        forum_data = ForumListSerializer(
            instance, context={"request": None}).data

        message: dict = {"msg_type": "forum_created", "data": forum_data}

        # with get_channel_layer() as channel_layer:
        channel_layer = get_channel_layer()

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(
            channel_layer.group_send(
                f"public_forum",
                {"type": "send_message", "message": message},
            )
        )

@receiver(post_save, sender=ForumComment)
def notify_a_forum_on_new_comment(sender, instance, created, **kwargs):
    from channels.layers import get_channel_layer
    from asgiref.sync import async_to_sync
    import asyncio
    import json

    forum_comment = ForumCommentListSerializer(
        instance, context={"request": None}).data
    if created:
        message: dict = {
            "msg_type": "forum_commented", "data": forum_comment}

        # with get_channel_layer() as channel_layer:
        channel_layer = get_channel_layer()

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(
            channel_layer.group_send(
                f"public_forum",
                {"type": "send_message", "message": message},
            )
        )
