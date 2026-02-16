from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from .tasks import analyze_github_health

class GitHubStatsView(APIView):
    def get(self, request):
        # 1. Try to get data from Redis cache
        stats = cache.get('github_stats')
        
        # 2. If cache is empty, trigger the task manually for the first time
        if not stats:
            # For debugging, we run it synchronously (.apply() instead of .delay())
            # so the first user doesn't see an empty screen
            stats = analyze_github_health("saadxsalman") 
            
        return Response(stats)