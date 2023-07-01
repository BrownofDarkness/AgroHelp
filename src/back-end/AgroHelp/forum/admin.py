from django.contrib import admin

from .models import Forum, ForumComment

# Register your models here.


class ForumCommentInline(admin.TabularInline):
    model = ForumComment
    extra = 0


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
    inlines = [ForumCommentInline]
    list_display = ("id", "author", "content", "created_at")


@admin.register(ForumComment)
class ForumCommentAdmin(admin.ModelAdmin):
    list_display = ["forum", "author", "parent", "content", "created_at"]

    list_filter = ["created_at", "forum"]
