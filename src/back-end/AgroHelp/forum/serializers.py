from rest_framework import serializers

from .models import Forum, ForumComment

from accounts.serializers import UserSerializer


class ForumCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = ForumComment
        fields = "__all__"

    def get_replies(self, obj: ForumComment):
        replies = ForumComment.objects.filter(parent=obj)

        return ForumCommentSerializer(replies, many=True).data


class ForumCommentListSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = ForumComment
        fields = "__all__"

    def get_replies(self, obj: ForumComment):
        replies = ForumComment.objects.filter(parent=obj)

        return ForumCommentSerializer(replies, many=True).data


class ForumCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForumComment

        exclude = ('author',)
    def save(self, **kwargs):

        author = self.context["request"].user
        return super().save(author=author,**kwargs)


class ForumCommentListSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = ForumComment

        fields = "__all__"

    def get_replies(self, obj: ForumComment):
        comments = ForumComment.objects.filter(parent=obj)

        return ForumCommentListSerializer(
            comments, many=True, context={"request": self.context["request"]}
        ).data


class ForumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Forum
        # fields = "__all__"
        exclude = [
            "author",
        ]

    def save(self, **kwargs):
        author = self.context["request"].user
        print("Validated Data",self.validated_data)
        forum = Forum.objects.create(
            content=self.validated_data["content"], author=author
        )
        return forum


class ForumListSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = Forum
        fields = "__all__"

    def get_comments(self, obj: Forum):
        messages_instance = ForumComment.objects.filter(forum=obj,parent=None)
        message_serializer = ForumCommentListSerializer(
            messages_instance, many=True, context={"request": self.context["request"]}
        )
        return message_serializer.data
