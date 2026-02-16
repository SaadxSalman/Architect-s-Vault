
from django.contrib import admin
from django.urls import path
from analytics.views import GitHubStatsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/github-stats/', GitHubStatsView.as_view(), name='github-stats'),
]
