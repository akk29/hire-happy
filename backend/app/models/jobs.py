import uuid 
from django.db import models
from app.models.users import User

class Job(models.Model):
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    title = models.CharField(max_length = 150,blank = False)
    description = models.CharField(max_length=400,blank = False)
    location = models.CharField(max_length=20,blank = False)
    user_id = models.ForeignKey(User,on_delete = models.CASCADE,blank = False, default='',related_name="user") # Posted by recrutier
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return ('{} at {} posted by {}'.format(self.title,self.location,self.user_id.first_name))
    
    class Meta:
        db_table = "jobs"

def latest_job_entry(request,a):
    total = Job.objects.count()
    if(total):
        return Job.objects.all().latest("created_at").created_at
    else:
        return None