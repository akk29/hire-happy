from app.error_handler.exceptions import UserAuthenticationRequiredException
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F, user_details_from_token

user_operations = DatabaseFactory.get_user_repository()

class VerifyAuthorizationToken():
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
            if(user_payload is None or user_payload[F.ROLE] == F.SUPERUSER):
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
