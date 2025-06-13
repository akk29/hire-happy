import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.core.mixins import checkBody, VerifyAdminAuthorizationToken
from app.services.admin_services import AdminServices
from app.transformers.admin_transformers import AdminTransformer
from app.utils.utilities import FILLER as F, get_user_payload 

admin_services = AdminServices()

class AdminLoginController(checkBody,APIView):

    throttle_classes = [UserRateThrottle]

    def get(self,request):
        admin_services.http_method_validation()
    
    def post(self,request):
        payload = JSONParser().parse(request)
        admin_user = admin_services.admin_login_service(**payload)
        payload = get_user_payload(status.HTTP_200_OK,F.SUCCESS,admin_user)
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)
        return response

class AdminUsersController(VerifyAdminAuthorizationToken,APIView):
    throttle_classes = [UserRateThrottle]
        
    def get(self,request):        
        limit = request.GET.get(F.LIMIT)
        offset = request.GET.get(F.OFFSET)
        if((not limit or not offset)):
            limit = 10
            offset = 0
        total , users = admin_services.admin_list_users(limit,offset)        
        transformed_payload = AdminTransformer.transform_users(total,users,limit,offset)
        response = HttpResponse(json.dumps(transformed_payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)
        return response
    
    def post(self,request):        
        admin_services.http_method_validation()  

class AdminJobsController(VerifyAdminAuthorizationToken,APIView):
    throttle_classes = [UserRateThrottle]
        
    def get(self,request):
        limit = request.GET.get(F.LIMIT)
        offset = request.GET.get(F.OFFSET)
        if((not limit or not offset)):
            limit = 10
            offset = 0
        total , jobs = admin_services.admin_list_jobs(limit,offset)          
        transformed_payload = AdminTransformer.transform_jobs(total,jobs,limit,offset)
        response = HttpResponse(json.dumps(transformed_payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)
        return response
    
    def post(self,request):        
        admin_services.http_method_validation()  

class AdminApplicationController(VerifyAdminAuthorizationToken,APIView):
    throttle_classes = [UserRateThrottle]
        
    def get(self,request):
        limit = request.GET.get(F.LIMIT)
        offset = request.GET.get(F.OFFSET)
        if((not limit or not offset)):
            limit = 10
            offset = 0
        total , applications = admin_services.admin_list_applications(limit,offset)                    
        transformed_payload = AdminTransformer.transform_applications(total,applications,limit,offset)
        response = HttpResponse(json.dumps(transformed_payload),content_type=F.APPLICATION_JSON,status=status.HTTP_200_OK)
        return response
    
    def post(self,request):        
        admin_services.http_method_validation()