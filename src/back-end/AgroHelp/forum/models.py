from typing import Iterable, Optional
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Forum(models.Model):
    title = models.TextField(max_length=255)
    image = models.ImageField(upload_to="image", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="forums")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class ForumPost(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name="messages")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class ForumPostComment(models.Model):
    post = models.ForeignKey(
        ForumPost, on_delete=models.CASCADE, related_name="comments"
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="reply_comments"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class ForumCommentVote(models.Model):
    VOTES = (("1", "1"), ("-1", "-1"))
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name="like")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    value = models.CharField(max_length=2, choices=VOTES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user.username} voted {self.value} on {self.comment}"
