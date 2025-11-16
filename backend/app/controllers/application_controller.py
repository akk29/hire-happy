import json
from django.http import HttpResponse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView
from app.core.mixins import CanidateCanApplyToJobOnly, checkBody, VerifyAuthToken
from app.services.application_services import ApplicationServices
from app.transformers.application_transformers import ApplicationTransformers
from app.utils.utilities import FILLER as F, get_offset_limit

application_services = ApplicationServices()

class ApplicationController(VerifyAuthToken,checkBody,CanidateCanApplyToJobOnly,APIView):
    throttle_classes = [UserRateThrottle]
        
    def get(self,request):        
        limit, offset = get_offset_limit(request)
        user = request.user
        total, jobs, role = application_services.get_applications(user,offset,limit)
        payload = ApplicationTransformers.transform_applications(role,total,jobs,limit,offset)
        response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_200_OK)                
        return response
    
    def post(self,request):        
        payload = JSONParser().parse(request)        
        user = request.user
        payload[F.USER_ID] = user[F.ID]
        application_services.create_application_service(**payload)        
        response = HttpResponse(json.dumps({F.CODE : status.HTTP_201_CREATED , F.MESSAGE : F.APPLIED}),content_type=F.APPLICATION_JSON,status = status.HTTP_201_CREATED)                
        return response

    