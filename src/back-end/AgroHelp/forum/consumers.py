from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from .models import Forum, ForumComment

from .serializers import ForumCommentSerializer, ForumCommentListSerializer


class PublicForumConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "public_forum"

        # Join Public Forum
        await self.channel_layer.group_add(self.room_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        # Disconnect Public Forum
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        """
        This receive function will broadcast data to other sockets if :
        - A Foum in a forum is created
        - Foum has been commented
        """

        text_data_json = json.loads(text_data)
        message: dict = text_data_json["message"]

        await self.channel_layer.group_send(
            self.room_name, {"type": "send_message", "message": message}
        )

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))


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
        - A forum has been commented
        """
        text_data_json = json.loads(text_data)
        message: dict = text_data_json["message"]

        data: dict = message.get("data")

        # create a forum post comment
        content: str = data.get("content", None)
        forum: int = data.get("forum", None)
        parent: int = data.get("parent", None)
        msg_data = await self.save_forum_comment(
            forum=forum, content=content, parent=parent)

        await self.channel_layer.group_send(
            self.room_name, {"type": "send_message", "message": msg_data}
        )

    async def send_message(self, event):
        message = event["message"]
        data = {"msg_type": "comment_created", "data": message}
        await self.send(text_data=json.dumps({"message": data}))

    @sync_to_async
    def save_forum_comment(self, forum: int, content: str, parent: int | None = None):
        user = self.scope["user"]
        forum = Forum.objects.get(id=int(self.room_name_id))
        if(parent == None):
            forum_comment = ForumComment.objects.create(
                forum=forum, author=user, parent=None, content=content
            )
        else:
            comment = ForumComment.objects.get(id = int(parent))
            forum_comment = ForumComment.objects.create(
                forum=forum, author=user, parent=comment, content=content
            ) 
        

        return ForumCommentListSerializer(forum_comment, context={"request": None}).data
