from app.models.jobs import Job
from app.repository.Dbrepository import CRUDRepository

class JobRepository(CRUDRepository):

    __instance = None

    def __init__(self):
        super().__init__(Job)
        self.model = Job

    @staticmethod
    def get_instance():
        if(JobRepository.__instance == None):
            return JobRepository()
        return JobRepository.__instance

    