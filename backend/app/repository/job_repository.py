from app.models.jobs import Job
from app.repository.db_repository import CRUDRepository

class JobRepository(CRUDRepository):

    __instance = None

    def __init__(self):
        super().__init__(Job)
        self.model = Job
    