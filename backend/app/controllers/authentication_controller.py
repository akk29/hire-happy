import json , hashlib
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.mixins.nullcheckjson import checkBody
from app.mixins.verifyjwtmixin import VerifyAuthorizationToken
from app.services.authentication_services import UserServices
from app.utils.utilities import FILLER as F, user_details_from_token, user_token_from_request, get_user_payload

user_service = UserServices()

class SignupController(checkBody,APIView):
    throttle_classes = [UserRateThrottle]

    def get(self,request):
        user_service.http_method_validation()
    
    def post(self,request):
        payload = JSONParser().parse(request)               
        User = user_service.signup_service(**payload)                
        payload = get_user_payload(status.HTTP_201_CREATED,F.CREATED,User)        
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status=status.HTTP_201_CREATED)        
        return response

class LoginController(checkBody,APIView):
    throttle_classes = [UserRateThrottle]

    def get(self,request):
        user_service.http_method_validation()

    def post(self,request):
        payload = JSONParser().parse(request)  
        User = user_service.login_service(**payload)
        payload = get_user_payload(status.HTTP_200_OK,F.SUCCESS,User)
        response =  HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)        
        return response

class ResetPasswordController(checkBody,APIView):
    throttle_classes = [UserRateThrottle]
    
    def get(self,request):
        user_service.http_method_validation()

    def post(self,request):
        payload = JSONParser().parse(request)
        payload = user_service.reset_password_check_email_service(**payload)        
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)        
        return response
    
class VerifyTokenController(checkBody,APIView):
    throttle_classes = [UserRateThrottle]

    def get(self,request,uidb64,token):
        payload = {F.UIDB64 : uidb64 , F.TOKEN : token }
        User = user_service.verify_reset_token_service(**payload)
        payload = get_user_payload(status.HTTP_200_OK,F.SUCCESS,User)        
        response =  HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)        
        return response
    
    def post(self,request):
        user_service.http_method_validation()


class ChangePasswordView(VerifyAuthorizationToken,checkBody,APIView):
     
    throttle_classes = [UserRateThrottle]

    def get(self,request):
        user_service.http_method_validation()

    def post(self,request):
        payload = JSONParser().parse(request)        
        user_token = user_token_from_request(request)
        user_id = user_details_from_token(user_token)[F.ID]     
        user_service.change_password_service(user_id,**payload)
        response = HttpResponse(json.dumps({F.CODE : status.HTTP_200_OK , F.MESSAGE : F.SUCCESS}),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)                
        return response