import json
from django.http import HttpResponse
from rest_framework import status
from app.utils.utilities import FILLER as F

def handler404(request, *args, **argv):
    payload = {F.CODE : status.HTTP_404_NOT_FOUND,F.MESSAGE : F.REQUEST_URL_NOT_FOUND}
    response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_404_NOT_FOUND)        
    return response

def handler500(request, *args, **argv):
    payload = {F.CODE : status.HTTP_500_INTERNAL_SERVER_ERROR,F.MESSAGE : F.INTERNAL_SERVER_ERROR}
    response = HttpResponse(json.dumps(payload),content_type=F.APPLICATION_JSON,status = status.HTTP_500_INTERNAL_SERVER_ERROR)        
    return response