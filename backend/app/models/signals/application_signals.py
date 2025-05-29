from app.celery.tasks import sendMailTask
from hirehappy.settings import INFO_EMAIL

def send_email_to_recruiter(sender,instance,created,**kwargs):
    recruiter_email = instance.job_id.user_id.email
    mail_body = {}
    mail_body['subject'] = 'Application Recieved'
    mail_body['message'] = 'Dear Recruiter, You have recieved the application'
    mail_body['sender'] = INFO_EMAIL
    mail_body['reciever'] = recruiter_email                
    # sendMailTask.delay(**mail_body)

def send_email_to_candidate(sender,instance,created,**kwargs):
    candidate_email = instance.user_id.email
    mail_body = {}
    mail_body['subject'] = 'Application Applied'
    mail_body['message'] = 'Dear Candidate , You have applied to Job'
    mail_body['sender'] = INFO_EMAIL
    mail_body['reciever'] = candidate_email    
    # sendMailTask.delay(**mail_body)
