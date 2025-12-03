from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from hirehappy.settings import config

class Command(BaseCommand):

    def handle(self, *args, **options):
        User = get_user_model()
        User.objects.create_superuser(config("ADMIN_EMAIL"),config('ADMIN_PASSWORD'))