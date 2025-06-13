from hirehappy.settings import RESET_EMAIL
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from app.celery.tasks import sendMailTask
from hirehappy.settings import SEND_MAIL
from app.error_handler.exceptions import RequestMethodNotAllowException
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F, generate_salt_for_user , generate_hash_password
from app.validator.run_validator import ValidationProcessor
from app.validator.auth_validators import SignupRules, LoginSchema, ResetPasswordSchema, VerifyResetTokenSchema, ChangePasswordSchema

class AuthenticationServices():

    def __init__(self):
        self.user_operations = DatabaseFactory.get_user_repository()
        self.validation_runner = ValidationProcessor()

    def signup_service(self,**kwargs):        
        self.validation_runner.validate(SignupRules,**kwargs)
        del kwargs[F.CONFIRM_PASSWORD]
        salt = generate_salt_for_user()
        kwargs[F.PASSWORD] = generate_hash_password(kwargs[F.PASSWORD],salt)             
        kwargs[F.SALT] = salt.decode() # while storing            
        return self.user_operations.create(**kwargs)

    def http_method_validation(self):
        raise RequestMethodNotAllowException()

    def login_service(self,**kwargs):        
        self.validation_runner.validate(LoginSchema,**kwargs)
        return self.user_operations.authenticate_user(**kwargs)     

    def reset_password_check_email_service(self,**kwargs):          
        self.validation_runner.validate(ResetPasswordSchema,**kwargs)
        message = self.user_operations.generate_password_reset_token(**kwargs)            
        mail_body = {}
        mail_body[F.SUBJECT] = F.RESET_PASSWORD
        mail_body[F.MESSAGE] = message
        mail_body[F.SENDER] = RESET_EMAIL
        mail_body[F.RECIEVER] = kwargs[F.EMAIL]
        if(SEND_MAIL):
            sendMailTask.delay(**mail_body)          
        else:
            print(mail_body)
        return { F.CODE: status.HTTP_200_OK , F.MESSAGE : F.SUCCESS}

    def verify_reset_token_service(self,**kwargs):        
        self.validation_runner.validate(VerifyResetTokenSchema,**kwargs)
        id = urlsafe_base64_decode(kwargs[F.UIDB64])
        return self.user_operations.object_by_id(id)
    
    def change_password_service(self,user_id,**kwargs):
        self.validation_runner.validate(ChangePasswordSchema,**kwargs)
        del kwargs[F.CONFIRM_PASSWORD]
        user = self.user_operations.object_by_id(user_id)
        if(user):
            salt = user.salt.encode()
            kwargs[F.PASSWORD] = generate_hash_password(kwargs[F.PASSWORD],salt)    
            kwargs[F.ID] = user_id 
            self.user_operations.update(**kwargs)
        return user

