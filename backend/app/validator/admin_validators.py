from marshmallow import ( Schema, fields, validates )
from app.error_handler.exceptions import NotFoundException
from app.repository.DatabaseFactory import DatabaseFactory
from app.utils.utilities import FILLER as F

job_operations = DatabaseFactory.get_job_repository()
user_operations = DatabaseFactory.get_user_repository()

class AdminLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

    @validates(F.EMAIL)    
    def validate_email_exits(self,data,**kwargs):                     
        try:
            search = {F.EMAIL : data.lower()}
            user = user_operations.search(**search)                                    
            if(user[0].profiletype != 0): # Superadmin
                user = []            
        except:
            pass        
        if(len(user) == 0):
            raise NotFoundException(F.EMAIL,F.EMAIL_NOT_FOUND)
