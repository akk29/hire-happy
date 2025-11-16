from django.db.models import Q as ex
from app.core.exceptions import PermissionDenied, NotFoundException
from app.models.users import profileTyepMapping
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F
from app.validator.job_validators import JobCreationSchema , JobUpdateSchema
from app.validator.run_validator import ValidationProcessor

class JobServices():

    def __init__(self):
        self.job_operations = DatabaseFactory.get_job_repository()
        self.application_operations = DatabaseFactory.get_application_repository()
        self.user_operations = DatabaseFactory.get_user_repository()
        self.validation_runner = ValidationProcessor()

    def create_job_service(self,user,**kwargs):
        self.validation_runner.validate(JobCreationSchema,**kwargs)
        role = profileTyepMapping[int(user.profiletype)]
        if(role != F.RECRUITER):            
            raise PermissionDenied(F.PERMISSION_DENIED,F.ONLY_RECRUITER_ALLOWED_POST) 
        kwargs[F.USER_ID] = self.user_operations.object_by_id(user.id) 
        self.job_operations.create(**kwargs)

    def get_jobs(self,user,limit,offset,**search):
        search = { F.USER_ID : user.id }        
        role = profileTyepMapping[int(user.profiletype)]  
        if(role == F.RECRUITER):                        
            total,final_jobs = self.jobs_for_recruiter_service(limit,offset,**search)                                                         
            return [total,final_jobs]
        else:            
            total,final_jobs = self.job_for_candidate_service(limit,offset,**search)        
            return [total,final_jobs]
    
    def jobs_for_recruiter_service(self,limit,offset,**kwargs):
        jobs =  self.job_operations.search_pagination(limit,offset,**kwargs)               
        total = jobs.count()        
        return [total , jobs]        
    
    def job_update_service(self,user,**kwargs):
        self.validation_runner.validate(JobUpdateSchema,**kwargs)
        job = None
        try:            
            job = self.job_operations.object_by_uuid(kwargs[F.UUID])            
        except:
            pass
        if(job is not None):
            if(job.user_id.id != user.id):
                raise PermissionDenied(F.ACCESS_DENIED,F.UNABLE_TO_EDIT_JOB)            
        else:
            raise NotFoundException(F.INVALID_UUID,F.JOB_NOT_FOUND)
        self.job_operations.update_by_uuid(**kwargs)

    def job_for_candidate_service(self,limit,offset,**kwargs):                       
        all_applied_applications = self.application_operations.search(**kwargs)    
        job_ids = [application.job_id.id for application in all_applied_applications]        
        paginated_jobs = self.job_operations.all_objects().order_by(F.CREATED_AT_DSC).filter(~ex(id__in=job_ids))[int(offset) : int(offset) + int(limit)]       
        total = self.job_operations.all_objects().filter(~ex(id__in=job_ids)).count()
        return [total,paginated_jobs]        
