from app.utils.utilities import FILLER as F
from app.repository.database_factory import DatabaseFactory
from app.validator.application_validators import CreateApplicationRules
from app.validator.run_validator import ValidationProcessor

class ApplicationServices():

    def __init__(self):
        self.job_operations = DatabaseFactory.get_job_repository()
        self.application_operations = DatabaseFactory.get_application_repository()
        self.user_operations = DatabaseFactory.get_user_repository()
        self.validation_runner = ValidationProcessor()

    def create_application_service(self,**kwargs):
        self.validation_runner.validate(CreateApplicationRules,**kwargs)          
        kwargs[F.JOB_ID] = self.job_operations.object_by_uuid(kwargs[F.UUID])
        kwargs[F.USER_ID] = self.user_operations.object_by_id(kwargs[F.USER_ID])                
        self.application_operations.create(**kwargs)

    def recruiters_applications_service(self,offset,limit,**kwargs):                 
        all_jobs = self.job_operations.search(**kwargs)
        job_ids = []
        for job in all_jobs:
            job_ids.append(job.id)        
        paginated_applications = self.application_operations.all_objects().filter(job_id__in = job_ids)[int(offset): int(limit) + int(offset)]
        total = self.application_operations.all_objects().filter(job_id__in = job_ids).count()
        return [total,paginated_applications]

    def candidate_applications_service(self,offset,limit,**kwargs):
        search = {F.USER_ID : kwargs[F.ID]}            
        applied = self.application_operations.search_pagination(limit,offset,**search)            
        total = self.application_operations.search(**search).count()                       
        return [total,applied]        