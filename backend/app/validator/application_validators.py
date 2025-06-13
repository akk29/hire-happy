from marshmallow import ( Schema, fields, validates, fields, validates_schema )
from app.core.exceptions import  ValidationExceptions, NotFoundException
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F

application_operations = DatabaseFactory.get_application_repository()
job_operations = DatabaseFactory.get_job_repository()

class CreateApplicationRules(Schema):
    uuid = fields.Str(required=True)   
    user_id = fields.Integer(required=True)
    
    @validates(F.UUID)
    def validate_id(self,data,**kwargs):        
        job = None
        try:
            job = job_operations.object_by_uuid(data)            
        except:
            pass
        if(job is None):
            raise NotFoundException(F.INVALID_UUID,F.JOB_APPLICATION_NOT_ALLOW)

    @validates_schema
    def validate_existing_application(self,data,**kwargs):                          
        job = None
        try:                   
            job = job_operations.object_by_uuid(data[F.UUID])            
        except:
            pass        
        if(job is not None):
            search = {F.JOB_ID : job.id , F.USER_ID : data[F.USER_ID]}
            application = None
            try:
                application = application_operations.search(**search)
            except:
                pass
            if(len(application) > 0):
                raise ValidationExceptions({F.JOB : F.ALREADY_APPLIED_TO_JOB})
            else:
                pass
        else:
            pass

    