from django.core.management.base import BaseCommand
from tracker.tasks import sync_github_health
import os

class Command(BaseCommand):
    help = 'CLI tool to refresh GitHub stats'

    def handle(self, *args, **options):
        user = os.getenv('GITHUB_USERNAME', 'saadxsalman')
        self.stdout.write(f"🔄 Fetching data for {user}...")
        res = sync_github_health(user)
        self.stdout.write(self.style.SUCCESS(f"✅ Score: {res['score']}"))