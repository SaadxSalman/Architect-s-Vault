import requests
import pandas as pd
from celery import shared_task
from django.core.cache import cache

@shared_task
def analyze_github_health(username="saadxsalman"):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url).json()
    
    repo_data = []
    for repo in response:
        repo_data.append({
            'name': repo['name'],
            'stars': repo['stargazers_count'],
            'forks': repo['forks_count'],
            'updated_at': repo['updated_at']
        })
    
    df = pd.DataFrame(repo_data)
    # Perform Pandas Analysis
    stats = {
        "total_repos": len(df),
        "total_stars": int(df['stars'].sum()),
        "avg_stars": float(df['stars'].mean()),
        "top_repos": df.nlargest(3, 'stars')[['name', 'stars']].to_dict('records')
    }
    
    # Cache results for 1 hour to avoid rate limits
    cache.set('github_stats', stats, 3600)
    return stats