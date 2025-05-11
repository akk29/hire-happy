import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hirehappy.settings') # DON'T FORGET TO CHANGE THIS ACCORDINGLY

app = Celery('hirehappy')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
