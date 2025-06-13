import ast, json 
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework import status   
from app.error_handler.exceptions import ValidationExceptions, RequestMethodNotAllowException, NotFoundException, UserAuthenticationRequiredException, PermissionDenied
from app.utils.utilities import FILLER as F

class ExceptionsProcessorMiddleware(MiddlewareMixin):
    
    def process_exception(self,request,exception):
        payload, response, code, exception_handled = None, None, None , False
        if(isinstance(exception,UserAuthenticationRequiredException)):            
            errors = ast.literal_eval(str(exception))
            code = status.HTTP_401_UNAUTHORIZED 
            exception_handled = True
            payload = {F.CODE : code , F.MESSAGE : F.AUTHENICATION_ERROR, F.ERRORS : errors}                    
        if(isinstance(exception,PermissionDenied)):
            errors = ast.literal_eval(str(exception))
            code = status.HTTP_403_FORBIDDEN
            exception_handled = True
            payload = {F.CODE : code , F.MESSAGE : F.FORBIDDEN , F.ERRORS : errors}
        if(isinstance(exception,NotFoundException)):
            errors = ast.literal_eval(str(exception)) 
            code = status.HTTP_404_NOT_FOUND
            exception_handled = True
            payload = {F.CODE : code , F.MESSAGE : F.NOT_FOUND, F.ERRORS : errors}                                
        if(isinstance(exception,RequestMethodNotAllowException)):
            code = status.HTTP_405_METHOD_NOT_ALLOWED 
            exception_handled = True
            payload = {F.CODE : code, F.MESSAGE : F.METHOD_NOT_ALLOWED}                         
        if(isinstance(exception,ValidationExceptions)):            
            errors = ast.literal_eval(str(exception))            
            code = status.HTTP_422_UNPROCESSABLE_ENTITY
            exception_handled = True
            payload = {F.CODE : code , F.MESSAGE : F.VALIDATION_FAILED, F.ERRORS : errors}             
        if(exception_handled):
            response = HttpResponse(json.dumps(payload),status=code,content_type=F.APPLICATION_JSON)     
            return response


def handler404(request, *args, **argv):
    payload = {F.CODE : status.HTTP_404_NOT_FOUND,F.MESSAGE : F.REQUEST_URL_NOT_FOUND}
    response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_404_NOT_FOUND)        
    return response

def handler500(request, *args, **argv):
    payload = {F.CODE : status.HTTP_500_INTERNAL_SERVER_ERROR,F.MESSAGE : F.INTERNAL_SERVER_ERROR}
    response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_500_INTERNAL_SERVER_ERROR)        
    return response