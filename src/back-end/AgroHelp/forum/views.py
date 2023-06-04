from django.shortcuts import render

from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.views

from .serializers import (
    ForumSerializer,
    ForumListSerializer,
    ForumCommentListSerializer,
    ForumCommentSerializer,
)

from rest_framework.permissions import IsAuthenticated

from .models import Forum, ForumComment

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
    
    def create(self, request, *args, **kwargs):
        serializer =self.get_serializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        forum = serializer.save()

        return Response(ForumListSerializer(forum,context={'request':request}).data, status=status.HTTP_201_CREATED)

    queryset = Forum.objects.all()


class ForumCommentViewSet(ModelViewSet, GenericViewSet):
    """
    This api helps to get post created in a forum
    """

    permission_classes = [IsAuthenticated]
    queryset = ForumComment.objects.all()

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return ForumCommentListSerializer

        return ForumCommentSerializer
    def create(self, request, *args, **kwargs):
        serializer =self.get_serializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        forum_comment = serializer.save()

        return Response(ForumCommentListSerializer(forum_comment,context={'request':request}).data, status=status.HTTP_201_CREATED)
