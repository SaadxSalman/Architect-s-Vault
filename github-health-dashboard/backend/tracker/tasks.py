import requests
import pandas as pd
from celery import shared_task
from django.core.cache import cache

@shared_task
def sync_github_health(username):
    # Note: Using GitHub API. To scrape a custom link later, ask me to update this!
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    repos = response.json()
    
    df = pd.DataFrame([{
        'name': r['name'], 
        'stars': r['stargazers_count'], 
        'forks': r['forks_count']
    } for r in repos])
    
    health_score = int(df['stars'].sum() * 1.5 + df['forks'].sum())
    result = {
        "score": health_score,
        "repos_count": len(df),
        "top_repos": df.nlargest(3, 'stars').to_dict('records')
    }
    cache.set(f'health_{username}', result, 3600)
    return result