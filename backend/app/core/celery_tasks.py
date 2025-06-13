from celery import shared_task
from django.core.mail import send_mail

@shared_task
def sendMailTask(**kwargs):    
    subject = kwargs['subject']
    message = kwargs['message']
    sender = kwargs['sender']
    reciever = [kwargs['reciever']]    
    send_mail(subject,message,sender,reciever)