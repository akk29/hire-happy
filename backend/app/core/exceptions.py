import json, traceback
from app.utils.loggerService import Logger

def process_exception(self):
    tb = traceback.extract_stack()[:-1]  # Exclude current frame        
    last_frame = tb[-2]
    if(hasattr(self,"warning_error")):
        last_frame = tb[-4]
    file_name = last_frame.filename
    line_no = last_frame.lineno
    func_name = last_frame.name
    if(hasattr(self,"warning_error")):
        self.logger.warning(f'{file_name} , {func_name}(), line no : {line_no} , raised {self.__repr__()}')
    else:
        self.logger.error(f'{file_name} , {func_name}(), line no : {line_no} , raised {self.__repr__()} ----- errors : {self.error}')

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
    
