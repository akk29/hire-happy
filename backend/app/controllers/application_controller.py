import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.core.mixins import checkBody, VerifyAuthToken
from app.services.application_services import ApplicationServices
from app.transformers.application_transformers import ApplicationTransformers
from app.utils.utilities import FILLER as F, get_limit_offset

application_services = ApplicationServices()

class ApplicationController(VerifyAuthToken,checkBody,APIView):
    throttle_classes = [UserRateThrottle]
        
    def get(self,request):        
        limit, offset = get_limit_offset(request)
        user = request.user_data
        total, jobs, role = application_services.get_applications(user,limit,offset)
        payload = ApplicationTransformers.transform_applications(role,total,jobs,limit,offset)
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)                
        return response
    
    def post(self,request):        
        payload = JSONParser().parse(request)        
        user = request.user_data
        application_services.create_application_service(user,**payload)        
        response = HttpResponse(json.dumps({F.CODE : status.HTTP_201_CREATED , F.MESSAGE : F.APPLIED}),content_type=F.APPLICATION_JSON,status = status.HTTP_201_CREATED)                
        return response

    