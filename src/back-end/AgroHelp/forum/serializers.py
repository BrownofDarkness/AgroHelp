from rest_framework import serializers

from .models import Forum, ForumPost, ForumCommentVote, ForumPostComment

from accounts.serializers import UserSerializer


class ForumPostCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = ForumPostComment
        fields = "__all__"

    def get_repplies(self, obj: ForumPostComment):
        replies = ForumPostComment.objects.filter(parent=obj)

        return ForumPostCommentSerializer(replies, many=True).data


class ForumPostCommentListSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = ForumPostComment
        fields = "__all__"

    def get_repplies(self, obj: ForumPostComment):
        replies = ForumPostComment.objects.filter(parent=obj)

        return ForumPostCommentSerializer(replies, many=True).data


class ForumPostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = ForumPost

        fields = "__all__"

    def get_comments(self, obj: ForumPost):
        comments = ForumPostComment.objects.filter(post=obj)

        return ForumPostCommentListSerializer(
            comments, many=True, context={"request": self.context["request"]}
        ).data


class ForumPostListSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = ForumPost

        fields = "__all__"

    def get_comments(self, obj: ForumPost):
        comments = ForumPostComment.objects.filter(post=obj)

        return ForumPostCommentSerializer(
            comments, many=True, context={"request": self.context["request"]}
        ).data


class ForumSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Forum
        fields = "__all__"

    def get_messages(self, obj: Forum):
        messages_instance = ForumPost.objects.filter(forum=obj)
        message_serializer = ForumPostListSerializer(
            messages_instance, many=True, context={"request": self.context["request"]}
        )
        return message_serializer.data


class ForumListSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    creator = UserSerializer()

    class Meta:
        model = Forum
        fields = "__all__"

    def get_messages(self, obj: Forum):
        messages_instance = ForumPost.objects.filter(forum=obj)
        message_serializer = ForumPostListSerializer(
            messages_instance, many=True, context={"request": self.context["request"]}
        )
        return message_serializer.data


class ForumCommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumCommentVote
        fields = "__all__"
