from rest_framework import status
from app.utils.utilities import FILLER as F

def get_payload(limit,offset,total):
    payload = {
        F.CODE : status.HTTP_200_OK,
        F.MESSAGE : F.SUCCESS,
        F.META_DATA: {
            F.RESULT_SET: {
            F.COUNT: int(total),
            F.OFFSET: int(offset),
            F.LIMIT: int(limit)
            }
        },       
    }
    return payload