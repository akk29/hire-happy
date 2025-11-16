import json
from app.core.exceptions import PermissionDenied,NotFoundException, UserAuthenticationRequiredException, ValidationExceptions
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F, user_token_from_request, user_details_from_token

user_operations = DatabaseFactory.get_user_repository()
job_operations = DatabaseFactory.get_job_repository()

class CanidateCanApplyToJobOnly():
    '''
    This Mixin will do :
    1. Candidate Can only Apply for Jobs in System
    '''
    # todo - move to service layer
    def dispatch(self,request,*args,**kwargs):        
        user_token = user_token_from_request(request)
        user_details = user_details_from_token(user_token)        
        if(request.method == F.POST):            
            if(user_details[F.ROLE] != F.CANDIDATE):
                raise PermissionDenied(F.PERMISSION_DENIED,F.RECRUITER_CANNOT_APPLY)        
        return super().dispatch(request, *args, **kwargs)
    
class checkBody():
    '''
    This Mixin will do :
    1. Check for empty Body
    2. Valid JSON input Stream Sent by User.
    '''
    def dispatch(self,request,*args,**kwargs):
        if(request.method == F.POST or request.method == F.PATCH):            
            if(len(request.body) == 0):
                raise ValidationExceptions({F.BODY : F.EMPTY_BODY})
            else:
                try:
                    json.loads(request.body)
                except:
                    raise ValidationExceptions({F.BODY : F.INVALID_JSON_STREAM})
        return super().dispatch(request, *args, **kwargs)

class RecuiterCanUpdateOrCreateJobMixin():
    '''
    This Mixin will check two things
    1. Recuiter can only Create the Jobs in System
    2. Recruiter can only edit their posted jobs
    '''
    def dispatch(self,request,*args,**kwargs):
        message_post = {
            F.PATCH: F.UPDATE,
            F.POST : F.CREATE
        }
        user_token = user_token_from_request(request)
        user_details = user_details_from_token(user_token)        
        if(request.method == F.POST or request.method == F.PATCH):            
            if(user_details[F.ROLE] != F.RECRUITER):
                raise PermissionDenied(F.PERMISSION_DENIED,F.ONLY_RECRUITER_ALLOWED.format(message_post[request.method]))
        if(request.method == F.PATCH):
            job = None
            try:            
                job = job_operations.object_by_uuid(json.loads(request.body)[F.UUID])            
            except:
                pass
            if(job is not None):
                if(job.user_id.id != user_details[F.ID]):
                    raise PermissionDenied(F.ACCESS_DENIED,F.UNABLE_TO_EDIT_JOB)            
            else:
                raise NotFoundException(F.INVALID_UUID,F.JOB_NOT_FOUND)
        return super().dispatch(request, *args, **kwargs)

class VerifyAdminAuthorizationToken():
    '''
    This mixin will do:
    1. Check Authorization headers in Request
    2. Check Authorization Prefix
    3. Decode Token 
    4. Check's User in DB else throw errors
    5. Check for Recruiter and Candidate Only     
    '''
    def dispatch(self,request,*args,**kwargs):
        if(F.AUTHORIZATION not in request.headers.keys()):
            raise UserAuthenticationRequiredException(F.AUTHORIZATION,F.AUTHORIZATION_HEADER_MISSING)
        authorization_header = request.headers[F.AUTHORIZATION]
        auth_data = authorization_header.split()      
        if(len(auth_data) == 2):
            prefix , token = auth_data
            if(prefix != F.BEARER):
                raise UserAuthenticationRequiredException(F.PREFIX_ERROR,F.BEARER_PREFIX_ERROR)            
            user_payload = None
            try:
                user_payload = user_details_from_token(token)                
            except:
                pass
            if(user_payload is None or user_payload[F.ROLE] != F.SUPERUSER):
                raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.INVALID_TOKEN)                
            else:
                user_data = user_operations.object_by_id(user_payload[F.ID])                
                if(not user_data):
                    raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.USER_DOESNOT_EXIST)                
        elif(len(auth_data) == 1):
            raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.AUTHORIZATION_DATA_MISSING)
        elif(len(auth_data) == 0):
            raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.AUTHORIZATION_DATA_MISSING)
        return super().dispatch(request, *args, **kwargs)

class VerifyAuthToken():
    def dispatch(self,request,*args,**kwargs):
        if(F.AUTHORIZATION not in request.headers.keys()):
            raise UserAuthenticationRequiredException(F.AUTHORIZATION,F.AUTHORIZATION_HEADER_MISSING)
        auth_header = request.headers[F.AUTHORIZATION]
        auth_data = auth_header.split()      
        if(len(auth_data) <= 1):
            raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.AUTHORIZATION_DATA_MISSING)        
        prefix, token = auth_data
        if(prefix != F.BEARER):
            raise UserAuthenticationRequiredException(F.PREFIX_ERROR,F.BEARER_PREFIX_ERROR)            
        user_payload = None
        # learn this from chatgpt full fledged error handling
        try:
            user_payload = user_details_from_token(token)                
        except:
            pass
        if(user_payload is None or user_payload[F.ROLE] == F.SUPERUSER):
            raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.INVALID_TOKEN)                
        else:
            user_data = user_operations.object_by_id(user_payload[F.ID])                
            if(not user_data):
                raise UserAuthenticationRequiredException(F.AUTHENICATION_ERROR,F.USER_DOESNOT_EXIST)
            request.user = user_data            
        return super().dispatch(request, *args, **kwargs)
