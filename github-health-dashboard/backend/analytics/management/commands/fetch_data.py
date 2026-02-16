from django.core.management.base import BaseCommand
from analytics.tasks import analyze_github_health

class Command(BaseCommand):
    help = 'Manually trigger GitHub data scraping'

    def handle(self, *args, **kwargs):
        self.stdout.write("Fetching GitHub data...")
        result = analyze_github_health("saadxsalman")
        self.stdout.write(self.style.SUCCESS(f"Successfully cached data: {result}"))