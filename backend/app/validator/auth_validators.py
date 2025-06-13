from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from marshmallow import ( Schema, fields, ValidationError , validates , validate,fields, validates_schema )
from app.error_handler.exceptions import NotFoundException
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F

user_operations = DatabaseFactory.get_user_repository()
job_operations = DatabaseFactory.get_job_repository()

def validate_password(data):
    if not any(char.isalpha() for char in data):
        raise ValidationError(F.PASSWORD_CRITERIA_FAILED_LETTER)
    if not any(char.isdigit() for char in data):
        raise ValidationError(F.PASSWORD_CRITERIA_FAILED_DIGIT)

class SignupRules(Schema):
    profiletype = fields.Integer(required=True)
    email = fields.Email(required=True)
    first_name = fields.Str(required=True,validate=validate.Length(min=3,max=10))  
    last_name = fields.Str(required=True,validate=validate.Length(min=3,max=10))
    password = fields.Str(required=True,validate=[validate_password,validate.Length(min=8,max=32)])
    confirm_password = fields.Str(required=True,validate=[validate_password,validate.Length(min=8,max=32)])

    @validates(F.PROFILE_TYPE)
    def validate_profiletype(self,profile_type,**kwargs):
        if (int(profile_type) != 1 and int(profile_type) != 2):
            raise ValidationError(F.INVALID_PROFILE_TYPE)
        
    @validates(F.EMAIL)
    def validate_uniqueEmail(self,email,**kwargs):
        user = user_operations.model.objects.filter(email = email.lower())           
        if(user.count() > 0):
            raise ValidationError(F.ALREADY_REGISTERED_EMAIL)
    
    @validates_schema
    def validate_samepassword(self,data,**kwargs):
        if(data[F.PASSWORD] != data[F.CONFIRM_PASSWORD]):
            raise ValidationError({F.PASSWORD : F.SAME_PASSWORD,F.CONFIRM_PASSWORD : F.SAME_PASSWORD})

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

    @validates(F.EMAIL)    
    def validate_email_exists(self,data,**kwargs):        
        user = user_operations.model.objects.filter(email = data.lower())
        if(user.count() == 0):
            raise NotFoundException(F.EMAIL,F.EMAIL_NOT_FOUND)

class ResetPasswordSchema(Schema):
    email = fields.Email(required=True)

    @validates(F.EMAIL)    
    def validate_email_exists(self,data,**kwargs):        
        user = user_operations.model.objects.filter(email = data.lower())
        if(user.count() == 0):
            raise NotFoundException(F.EMAIL,F.EMAIL_NOT_FOUND)

class VerifyResetTokenSchema(Schema):
    uidb64 = fields.Str(required=True)
    token = fields.Str(required=True)

    @validates_schema()
    def validate_token(self,data,**kwargs):
        try:
            user = user_operations.model.objects.get(pk = urlsafe_base64_decode(data[F.UIDB64]))                
        except:
            user = None              
        if(default_token_generator.check_token(user, data[F.TOKEN]) == True):
            pass           
        else:
            raise NotFoundException(F.TOKEN,F.INVALID_TOKEN_USER)
        
class ChangePasswordSchema(Schema):
    password = fields.Str(required=True,validate=[validate_password,validate.Length(min=8,max=32)])
    confirm_password = fields.Str(required=True,validate=[validate_password,validate.Length(min=8,max=32)])

    @validates_schema
    def validate_same_password(self,data,**kwargs):
        if(data[F.PASSWORD] != data[F.CONFIRM_PASSWORD]):
            raise ValidationError({F.PASSWORD : F.SAME_PASSWORD,F.CONFIRM_PASSWORD : F.SAME_PASSWORD})