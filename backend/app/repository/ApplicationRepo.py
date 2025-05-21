from app.models.application import Application
from app.repository.Dbrepository import CRUDRepository

class ApplicationRepository(CRUDRepository):

    __instance = None

    def __init__(self):
        super().__init__(Application)
        self.model = Application
    