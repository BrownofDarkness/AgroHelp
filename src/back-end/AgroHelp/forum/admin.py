from django.contrib import admin

from .models import Forum, ForumPost, ForumPostComment, ForumCommentVote

# Register your models here.


class ForumPostInline(admin.TabularInline):
    model = ForumPost
    extra = 0


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
    inlines = [ForumPostInline]
    list_display = ("id", "description", "creator")


admin.site.register(ForumPostComment)


@admin.register(ForumPost)
class ForumPostAdmin(admin.ModelAdmin):
    list_display = ["forum", "author", "title", "content", "created_at"]

    list_filter = ["created_at", "forum"]
