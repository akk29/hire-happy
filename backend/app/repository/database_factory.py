from app.repository.application_repository import ApplicationRepository
from app.repository.job_repository import JobRepository 
from app.repository.user_repository import UserRepository

class DatabaseFactory():

    @staticmethod
    def get_job_repository():
        return JobRepository.get_instance()
    
    @staticmethod
    def get_user_repository():
        return UserRepository.get_instance()

    @staticmethod
    def get_application_repository():
        return ApplicationRepository.get_instance()