from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import Forum, ForumPost, ForumPostComment, ForumCommentVote

from .serializers import ForumPostSerializer, ForumPostCommentSerializer


class ForumConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name_id = self.scope["url_route"]["kwargs"]["forum_id"]
        self.room_name = "forum_%s" % self.room_name_id

        # Join Forum
        await self.channel_layer.group_add(self.room_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        # Disconnect Forum
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        """
        This receive function will broadcast data to other sockets if :
        - A Post in a forum is created
        - Post has been commented
        """
        text_data_json = json.loads(text_data)
        message: dict = text_data_json["message"]

        msg_type: str = message.get("msg_type")
        data: dict = message.get("data")

        print(text_data_json)

        if msg_type == "create_post":
            # create a forum post
            title: str = data.get("title")
            content: str = data.get("content")

            msg_data = await self.save_forum_message(title=title, content=content)
            await self.channel_layer.group_send(
                self.room_name, {"type": "send_comment", "message": msg_data}
            )

        elif msg_type == "comment_post":
            # create a forum post comment
            content: str = data.get("content")
            post: int = data.get("post")
            parent: int = data.get("parent")
            msg_data = self.save_forum_post_comment(
                post=post, content=content, parent=parent
            )
            await self.channel_layer.group_send(
                self.room_name, {"type": "send_message", "message": msg_data}
            )

    async def send_comment(self, event):
        message = event["message"]
        data = {"msg_type": "comment_created", "data": message}
        self.send(text_data=json.dumps({"message": data}))

    async def send_message(self, event):
        message = event["message"]
        data = {"msg_type": "comment_created", "data": message}
        self.send(text_data=json.dumps({"message": data}))

    @sync_to_async
    def save_forum_message(self, title: str, content: str):
        # here i will get the sender of the message in the scope dictionary
        user = self.scope["user"]
        forum = Forum.objects.get(id=int(self.room_name_id))
        forum_instance = ForumPost.objects.create(
            forum=forum, author=user, title=title, content=content
        )

        return ForumPostSerializer(forum_instance).data

    @sync_to_async
    def save_forum_post_comment(
        self, post: int, content: str, parent: int | None = None
    ):
        user = self.scope["user"]
        forum = Forum.objects.get(id=int(self.room_name_id))
        post_comment = ForumPostComment.objects.create(
            post=post, author=user, parent=parent, content=content
        )

        return ForumPostCommentSerializer(post_comment).data
