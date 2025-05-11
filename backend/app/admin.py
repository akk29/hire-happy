from django.contrib import admin
from app.models.application import Application
from app.models.jobs import Job
from app.models.users import User 

admin.site.register(Application)
admin.site.register(Job)
admin.site.register(User)
