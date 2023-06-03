from typing import Iterable, Optional
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Forum(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.content

    class Meta:
        ordering = ["-created_at"]


class ForumComment(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="reply_comments",
        null=True,
        blank=True,
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.author} commented to {self.forum}"
