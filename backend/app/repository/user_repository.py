from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from app.error_handler.exceptions import UserAuthenticationRequiredException
from app.models.users import User
from app.repository.db_repository import CRUDRepository
from app.utils.utilities import create_reset_message

class UserRepository(CRUDRepository):
    
    __instance = None

    def __init__(self):
        super().__init__(User)
        self.model = User
    
    def authenticate_user(self,**kwargs):
        email = kwargs['email'].lower()
        password = kwargs['password']
        user = None
        try:
            user = authenticate(email=email,password=password)
            if(user is not None):                
                return user            
        except:
            pass
        if(user is None):                      
            raise UserAuthenticationRequiredException('password','incorrect password')

    def generate_password_reset_token(self,**kwargs):
        u = User.objects.get(email = kwargs['email'])
        uidb64 = urlsafe_base64_encode(force_bytes(u.pk))
        token = default_token_generator.make_token(u)
        full_name = "{} {}".format(u.first_name , u.last_name)
        return create_reset_message(uidb64,token,full_name)