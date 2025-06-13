from app.core.exceptions import RequestMethodNotAllowException
from app.repository.database_factory import DatabaseFactory
from app.validator.admin_validators import AdminLoginRules
from app.validator.run_validator import ValidationProcessor

class AdminServices():

    def __init__(self):
        self.job_operations = DatabaseFactory.get_job_repository()
        self.application_operations = DatabaseFactory.get_application_repository()
        self.user_operations = DatabaseFactory.get_user_repository()
        self.validation_runner = ValidationProcessor()

    def admin_login_service(self,**kwargs):
        self.validation_runner.validate(AdminLoginRules,**kwargs)
        return self.user_operations.authenticate_user(**kwargs)     

    def admin_list_users(self,limit,offset):
        total = self.user_operations.count()
        payload = self.user_operations.all_objects()[int(offset) : int(offset) + int(limit)]
        return [total , payload]        

    def admin_list_jobs(self,limit,offset):
        total = self.job_operations.count()
        payload = self.job_operations.all_objects()[int(offset) : int(offset) + int(limit)]
        return [total , payload]
    
    def admin_list_applications(self,limit,offset):
        total = self.application_operations.count()
        payload = self.application_operations.all_objects()[int(offset) : int(offset) + int(limit)]
        return [total , payload]
    
    def http_method_validation(self):
        raise RequestMethodNotAllowException()
    