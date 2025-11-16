from app.core.exceptions import PermissionDenied
from app.models.users import profileTyepMapping
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

    def create_application_service(self,user,**kwargs):
        kwargs[F.USER_ID] = user[F.ID]
        self.validation_runner.validate(CreateApplicationRules,**kwargs)  
        role = profileTyepMapping[int(user.profiletype)]          
        if(role != F.CANDIDATE):
            raise PermissionDenied(F.PERMISSION_DENIED,F.RECRUITER_CANNOT_APPLY)        
        kwargs[F.JOB_ID] = self.job_operations.object_by_uuid(kwargs[F.UUID])
        kwargs[F.USER_ID] = self.user_operations.object_by_id(kwargs[F.USER_ID])                
        self.application_operations.create(**kwargs)

    def get_applications(self,user,offset,limit):
        role = profileTyepMapping[int(user.profiletype)]     
        if(role == F.RECRUITER):
            search = { F.USER_ID : user[F.ID] }
            total , jobs = self.recruiters_applications_service(offset,limit,**search)            
            return [total,jobs,role]            
        else:            
            total , jobs = self.candidate_applications_service(offset,limit,**{F.ID : user.id})            
            return [total,jobs,role]

    def recruiters_applications_service(self,offset,limit,**kwargs):                 
        all_jobs = self.job_operations.search(**kwargs)
        job_ids = [job.id for job in all_jobs]        
        applications = self.application_operations.all_objects().filter(job_id__in = job_ids)[int(offset): int(limit) + int(offset)]
        total = self.application_operations.all_objects().filter(job_id__in = job_ids).count()
        return [total,applications]

    def candidate_applications_service(self,offset,limit,**kwargs):
        search = {F.USER_ID : kwargs[F.ID]}            
        applied = self.application_operations.search_pagination(limit,offset,**search)            
        total = self.application_operations.search(**search).count()                     
        return [total,applied]        