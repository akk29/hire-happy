from app.repository.ApplicationRepo import ApplicationRepository
from app.repository.JobRepo import JobRepository 
from app.repository.UserRepo import UserRepository

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