from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from hirehappy.settings import config
from app.utils.loggerService import Logger

logger = Logger.get_logger()
class Command(BaseCommand):

    def handle(self, *args, **options):
        User = get_user_model()
        try:            
            user = User.objects.get(email=config("ADMIN_EMAIL"))
            logger.info('admin user already registered')
        except User.DoesNotExist:
            User.objects.create_superuser(config("ADMIN_EMAIL"),config('ADMIN_PASSWORD'))
            logger.info('admin user registered')
