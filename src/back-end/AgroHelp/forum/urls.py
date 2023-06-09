from django.urls import path

from rest_framework.routers import DefaultRouter


from . import views

router = DefaultRouter()

router.register("forum", views.ForumViewSet, basename="forum")
router.register("forum-post", views.ForumPostViewSet, basename="forum-post")
router.register(
    "forum-post-comment", views.ForumPostCommentViewSet, basename="forum-post-comment"
)
# router.register(
#     "forum-post-comment-vote",
#     views.ForumCommentVoteViewSet,
#     basename="forum-post-comment-vote",
# )


urlpatterns = []

urlpatterns += router.urls
