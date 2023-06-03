from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.


class User(models.Model):
    id = models.BigIntegerField(primary_key=True, auto_created=False)
    USER_TYPES = (("agriculteur", "agriculteur"), ("expert", "expert"))
    type = models.CharField(choices=USER_TYPES, max_length=20)
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(
        _("username"), help_text="username", unique=True, max_length=120
    )


class Forum(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.content


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

    # def __str__(self) -> str:
    #     return f"{self.author} commented to {self.forum}"
