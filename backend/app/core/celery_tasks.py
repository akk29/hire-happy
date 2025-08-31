from celery import shared_task
from django.core.mail import send_mail
from app.utils.utilities import FILLER as F

@shared_task
def sendMailTask(**kwargs):    
    subject = kwargs[F.SUBJECT]
    message = kwargs[F.MESSAGE]
    sender = kwargs[F.SENDER]
    reciever = [kwargs[F.RECIEVER]]    
    send_mail(subject,message,sender,reciever)