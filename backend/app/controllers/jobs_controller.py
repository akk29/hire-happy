import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.core.mixins import checkBody, VerifyAuthToken
from app.services.job_services import JobServices
from app.transformers.job_transformers import JobTransformer
from app.utils.utilities import FILLER as F, get_limit_offset

job_services = JobServices()

class JobController(VerifyAuthToken,checkBody,APIView):
    throttle_classes = [UserRateThrottle]

    def get(self,request):
        limit, offset = get_limit_offset(request)
        user = request.user_data
        total, final_jobs = job_services.get_jobs(user,limit,offset)      
        payload = JobTransformer.transform_jobs(total,limit,offset,final_jobs)            
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)        
        return response    
        
    def post(self,request):
        payload = JSONParser().parse(request)         
        user = request.user_data  
        job_services.create_job_service(user,**payload)     
        payload = { F.CODE : status.HTTP_201_CREATED , F.MESSAGE : F.CREATED }
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_201_CREATED)        
        return response
    
    def patch(self,request):
        payload = JSONParser().parse(request)
        user = request.user_data
        job_services.job_update_service(user,**payload)
        response = HttpResponse(json.dumps({F.CODE : status.HTTP_200_OK , F.MESSAGE : F.UPDATED}),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)        
        return response