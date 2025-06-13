import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.models.application import latest_entry_application
from app.controllers.mixins.candidatejob import CanidateCanApplyToJobOnly
from app.controllers.mixins.nullcheckjson import checkBody
from app.controllers.mixins.verifyjwtmixin import VerifyAuthorizationToken
from app.services.application_services import ApplicationServices
from app.transformers.application_transformers import ApplicationTransformers
from app.utils.utilities import FILLER as F, user_token_from_request, user_details_from_token

application_services = ApplicationServices()

class ApplicationController(VerifyAuthorizationToken,checkBody,CanidateCanApplyToJobOnly,APIView):
    throttle_classes = [UserRateThrottle]
        
    def get(self,request):
        limit = request.GET.get(F.LIMIT)
        offset = request.GET.get(F.OFFSET)
        if((not limit or not offset)):
            limit = 10
            offset = 0        
        user_token = user_token_from_request(request)
        user_details = user_details_from_token(user_token)     
        role = user_details[F.ROLE]     
        if(role == F.RECRUITER):
            search = { F.USER_ID : user_details[F.ID] }
            total , jobs = application_services.recruiters_applications_service(offset,limit,**search)            
            payload = ApplicationTransformers.transform_applications(role,total,jobs,limit,offset)
        else:            
            total , jobs = application_services.candidate_applications_service(offset,limit,**user_details)            
            payload = ApplicationTransformers.transform_applications(role,total,jobs,limit,offset)
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)        
        return response
    
    def post(self,request):        
        payload = JSONParser().parse(request)        
        user_token = user_token_from_request(request)
        candidate_details = user_details_from_token(user_token)
        payload[F.USER_ID] = candidate_details[F.ID]
        application_services.create_application_service(**payload)        
        response = HttpResponse(json.dumps({F.CODE : status.HTTP_201_CREATED , F.MESSAGE : F.APPLIED}),content_type=F.APPLICATION_JSON,status = status.HTTP_201_CREATED)                
        return response

    