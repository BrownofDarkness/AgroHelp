from django.shortcuts import render

from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, GenericViewSet

# from rest_framework.views

from .serializers import (
    ForumPostCommentListSerializer,
    ForumPostCommentSerializer,
    ForumCommentVoteSerializer,
    ForumPostListSerializer,
    ForumPostSerializer,
    ForumListSerializer,
    ForumSerializer,
)

from rest_framework.permissions import IsAuthenticated

from .models import Forum, ForumPost, ForumPostComment, ForumCommentVote

# Create your views here.


class ForumViewSet(ModelViewSet, GenericViewSet):
    """
    This api view get all the forums
    """

    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ForumListSerializer
        return ForumSerializer

    queryset = Forum.objects.all()


class ForumPostViewSet(ModelViewSet, GenericViewSet):
    """
    This api helps to get post created in a forum
    """

    permission_classes = [IsAuthenticated]
    queryset = ForumPost.objects.all()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ForumPostListSerializer

        return ForumPostSerializer


class ForumPostCommentViewSet(ModelViewSet, GenericViewSet):
    serializer_class = ForumPostCommentSerializer
    permission_classes = [IsAuthenticated]
    queryset = ForumPostComment.objects.all()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ForumPostCommentListSerializer
        return ForumPostCommentSerializer


class ForumCommentVoteViewSet(ModelViewSet, GenericViewSet):
    serializer_class = ForumCommentVoteSerializer
    queryset = ForumCommentVote.objects.all()
