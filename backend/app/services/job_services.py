from django.db.models import Q as ex
from app.repository.DatabaseFactory import DatabaseFactory
from app.utils.utilities import FILLER as F
from app.validator.job_validators import JobCreationSchema , JobUpdateSchema
from app.validator.run_validator import RunValidatorOnData

class JobServices():

    def __init__(self):
        self.job_operations = DatabaseFactory.get_job_repository()
        self.application_operations = DatabaseFactory.get_application_repository()
        self.user_operations = DatabaseFactory.get_user_repository()
        self.validation_runner = RunValidatorOnData()

    def create_job_service(self,user_id,**kwargs):
        self.validation_runner.fire(JobCreationSchema,**kwargs)
        kwargs[F.USER_ID] = self.user_operations.object_by_id(user_id) 
        self.job_operations.create(**kwargs)
    
    def jobs_for_recruiter_service(self,limit,offset,**kwargs):
        jobs =  self.job_operations.search_pagination(limit,offset,**kwargs)               
        total = jobs.count()        
        return [total , jobs]        
    
    def job_update_service(self,**kwargs):
        self.validation_runner.fire(JobUpdateSchema,**kwargs)
        self.job_operations.update_by_uuid(**kwargs)

    def job_for_candidate_service(self,limit,offset,**kwargs):                       
        all_applied_applications = self.application_operations.search(**kwargs)    
        job_ids = []
        for application in all_applied_applications:
            job_ids.append(application.job_id.id)        
        all_available_jobs = self.job_operations.all_objects().filter(~ex(id__in=job_ids))                       
        total = all_available_jobs.count()
        final_jobs = all_available_jobs[int(offset) : int(offset) + int(limit)]       
        return [total,final_jobs]        
