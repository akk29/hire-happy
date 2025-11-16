from django.db.models import Q as ex
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

    def create_job_service(self,user_id,**kwargs):
        self.validation_runner.validate(JobCreationSchema,**kwargs)
        kwargs[F.USER_ID] = self.user_operations.object_by_id(user_id) 
        self.job_operations.create(**kwargs)

    def get_jobs(self):
        pass
    
    def jobs_for_recruiter_service(self,limit,offset,**kwargs):
        jobs =  self.job_operations.search_pagination(limit,offset,**kwargs)               
        total = jobs.count()        
        return [total , jobs]        
    
    def job_update_service(self,**kwargs):
        self.validation_runner.validate(JobUpdateSchema,**kwargs)
        self.job_operations.update_by_uuid(**kwargs)

    def job_for_candidate_service(self,limit,offset,**kwargs):                       
        all_applied_applications = self.application_operations.search(**kwargs)    
        job_ids = []
        for application in all_applied_applications:
            job_ids.append(application.job_id.id)        
        paginated_jobs = self.job_operations.all_objects().order_by(F.CREATED_AT_DSC).filter(~ex(id__in=job_ids))[int(offset) : int(offset) + int(limit)]       
        total = self.job_operations.all_objects().filter(~ex(id__in=job_ids)).count()
        return [total,paginated_jobs]        
