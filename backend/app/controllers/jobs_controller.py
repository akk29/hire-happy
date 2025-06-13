import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.core.mixins import checkBody, RecuiterCanUpdateOrCreateJobMixin,VerifyAuthorizationToken
from app.services.job_services import JobServices
from app.transformers.job_transformers import JobTransformer
from app.utils.utilities import FILLER as F, user_token_from_request, user_details_from_token 

job_services = JobServices()

class JobController(VerifyAuthorizationToken,checkBody,RecuiterCanUpdateOrCreateJobMixin,APIView):
    throttle_classes = [UserRateThrottle]

    def get(self,request):
        limit = request.GET.get(F.LIMIT)
        offset = request.GET.get(F.OFFSET)
        if((not limit or not offset)):
            limit = 10
            offset = 0
        ''' Recruiter get All jobs posted by him/her'''
        ''' Candidate get all the jobs for which they haven't applied till now'''
        user_token = user_token_from_request(request)
        user_details = user_details_from_token(user_token)        
        search = {F.USER_ID : user_details[F.ID]}        
        if(user_details[F.ROLE] == F.RECRUITER):                        
            total,final_jobs = job_services.jobs_for_recruiter_service(limit,offset,**search)                                                         
            payload = JobTransformer.transform_jobs(total,limit,offset,final_jobs)                        
        else:            
            total,final_jobs = job_services.job_for_candidate_service(limit,offset,**search)        
            payload = JobTransformer.transform_jobs(total,limit,offset,final_jobs)            
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)        
        return response    
        
    def post(self,request):
        payload = JSONParser().parse(request)        
        user_token = user_token_from_request(request)
        user_id = user_details_from_token(user_token)[F.ID]     
        job_services.create_job_service(user_id,**payload)     
        payload = {F.CODE : status.HTTP_201_CREATED , F.MESSAGE : F.CREATED}
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_201_CREATED)        
        return response
    
    def patch(self,request):
        payload = JSONParser().parse(request)
        job_services.job_update_service(**payload)
        response = HttpResponse(json.dumps({F.CODE : status.HTTP_200_OK , F.MESSAGE : F.UPDATED}),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)        
        return response
