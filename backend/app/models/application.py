import uuid
from django.db import models
from django.db.models.signals import post_save
from app.models.jobs import Job
from app.models.users import User
from app.models.signals.application_signals import send_email_to_recruiter, send_email_to_candidate

class Application(models.Model):
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    job_id = models.ForeignKey(Job, on_delete = models.CASCADE , blank = False , null = False)
    user_id = models.ForeignKey(User,on_delete = models.CASCADE,null = False,blank=False )    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return('Application for {} applied by {}'.format(self.job_id,self.user_id))
        
    class Meta:
        db_table = "applications"

post_save.connect(send_email_to_recruiter,sender = Application)
post_save.connect(send_email_to_candidate,sender = Application)

def latest_entry_application():
    total = Application.objects.count()
    if(total):
        return Application.objects.all().latest("created_at").created_at
    return None
