from django.contrib.auth.backends import ModelBackend
from app.utils.utilities import FILLER as F, generate_hash_password
from app.models.users import User

class CustomUserAuthentication(ModelBackend):

    def authenticate(self,request,**kwargs):
        emailid = kwargs[F.EMAIL].lower()
        password = str(kwargs[F.PASSWORD])     
        user_info = User.objects.filter(email = emailid)  
        current_password = user_info[0].password
        user_salt = str.encode(user_info[0].salt)        
        hashed_password = generate_hash_password(password,user_salt)        
        if(str(hashed_password) == str(current_password)):                      
            return user_info[0]
        else:
            return None       
        
   

