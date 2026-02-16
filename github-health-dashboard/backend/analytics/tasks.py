import requests
import pandas as pd
from celery import shared_task
from django.core.cache import cache
from django.conf import settings

@shared_task
def analyze_github_health(username="saadxsalman"):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "GitHub API limit reached or User not found"}

    repos = response.json()
    repo_data = [{
        'name': r['name'],
        'stars': r['stargazers_count'],
        'forks': r['forks_count'],
        'updated_at': r['updated_at']
    } for r in repos]
    
    df = pd.DataFrame(repo_data)
    
    stats = {
        "total_repos": len(df),
        "total_stars": int(df['stars'].sum()),
        "avg_stars": round(float(df['stars'].mean()), 2),
        "top_repos": df.nlargest(3, 'stars')[['name', 'stars']].to_dict('records')
    }
    
    cache.set('github_stats', stats, 3600)
    return stats