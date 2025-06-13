from app.error_handler.exceptions import PermissionDenied 
from app.utils.utilities import FILLER as F, user_token_from_request, user_details_from_token
class CanidateCanApplyToJobOnly():
    '''
    This Mixin will do :
    1. Candidate Can only Apply for Jobs in System
    '''
    def dispatch(self,request,*args,**kwargs):        
        user_token = user_token_from_request(request)
        user_details = user_details_from_token(user_token)        
        if(request.method == F.POST):            
            if(user_details[F.ROLE] != F.CANDIDATE):
                raise PermissionDenied(F.PERMISSION_DENIED,F.RECRUITER_CANNOT_APPLY)        
        return super().dispatch(request, *args, **kwargs)

        