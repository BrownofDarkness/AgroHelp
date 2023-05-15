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
admin.site.register(ForumCommentVote)
