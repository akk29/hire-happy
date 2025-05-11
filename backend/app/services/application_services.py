from app.utils.utilities import FILLER as F
from app.repository.DatabaseFactory import DatabaseFactory
from app.validator.application_validators import CreateApplicationSchema
from app.validator.run_validator import RunValidatorOnData

class ApplicationServices():

    def __init__(self):
        self.job_operations = DatabaseFactory.get_job_repository()
        self.application_operations = DatabaseFactory.get_application_repository()
        self.user_operations = DatabaseFactory.get_user_repository()
        self.validation_runner = RunValidatorOnData()

    def create_application_service(self,**kwargs):
        self.validation_runner.fire(CreateApplicationSchema,**kwargs)          
        kwargs[F.JOB_ID] = self.job_operations.object_by_uuid(kwargs[F.UUID])
        kwargs[F.USER_ID] = self.user_operations.object_by_id(kwargs[F.USER_ID])                
        self.application_operations.create(**kwargs)

    def recruiters_applications_service(self,offset,limit,**kwargs):                 
        all_jobs = self.job_operations.search(**kwargs)
        job_ids = []
        for job in all_jobs:
            job_ids.append(job.id)        
        applications = self.application_operations.all_objects().filter(job_id__in = job_ids)
        total = applications.count()
        paginated_applications = []
        if(total > 0):
            paginated_applications = applications[int(offset): int(limit) + int(offset)]
            return [total,paginated_applications]
        else:
            return [total,paginated_applications]

    def candidate_applications_service(self,offset,limit,**kwargs):
        search = {F.USER_ID : kwargs[F.ID]}            
        applied = self.application_operations.search_pagination(limit,offset,**search)            
        total = self.application_operations.search(**search).count()                       
        return [total,applied]        