from app.core.celery_tasks import sendMailTask
from app.utils.utilities import FILLER as F
from hirehappy.settings import INFO_EMAIL, SEND_MAIL

def send_email_to_recruiter(sender,instance,created,**kwargs):
    recruiter_email = instance.job_id.user_id.email
    mail_body = {}
    mail_body[F.SUBJECT] = F.APPLICATION_RECEIVED
    mail_body[F.MESSAGE] = F.APPLICATION_RECEIVED_RECRUITER
    mail_body[F.SENDER] = INFO_EMAIL
    mail_body[F.RECIEVER] = recruiter_email
    if SEND_MAIL:
        sendMailTask.delay(**mail_body)

def send_email_to_candidate(sender,instance,created,**kwargs):
    candidate_email = instance.user_id.email
    mail_body = {}
    mail_body[F.SUBJECT] = F.APPLICATION_APPLIED
    mail_body[F.MESSAGE] = F.JOB_APPLIED_CANDIDATE
    mail_body[F.SENDER] = INFO_EMAIL
    mail_body[F.RECIEVER] = candidate_email    
    if SEND_MAIL:        
        sendMailTask.delay(**mail_body)
