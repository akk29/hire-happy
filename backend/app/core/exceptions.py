import json, traceback
from app.utils.loggerService import Logger
from app.utils.utilities import FILLER as F

def process_exception(self):
    tb = traceback.extract_stack()[:-1]  # Exclude current frame        
    last_frame = tb[-2]
    print(self)
    if(hasattr(self,F.WARNING_ERROR)):
        last_frame = tb[-4]
    file_name = last_frame.filename
    line_no = last_frame.lineno
    func_name = last_frame.name
    if(hasattr(self,F.WARNING_ERROR)):
        self.logger.warning(f'{file_name}:{line_no}:{func_name} - {self.__repr__()}')
    else:
        self.logger.error(f'{file_name}:{line_no}:{func_name} - {self.__repr__()} - {self.error}')        

class BaseExceptions(Exception):

    def __init__(self,field,error):
        self.field = field
        self.error = error
        self.logger = Logger.get_logger()
        process_exception(self)

    def __str__(self):
        return json.dumps({ self.field : self.error })
class RequestMethodNotAllowException(Exception):
    pass
class ValidationExceptions(Exception):
    pass
class NotFoundException(BaseExceptions):
    pass
class UserAuthenticationRequiredException(BaseExceptions):
    pass
class PermissionDenied(BaseExceptions):
    pass
    
