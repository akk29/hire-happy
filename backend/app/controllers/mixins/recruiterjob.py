import json
from app.error_handler.exceptions import PermissionDenied,NotFoundException
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F, user_token_from_request, user_details_from_token

job_operations = DatabaseFactory.get_job_repository()

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

        