import json
from app.error_handler.exceptions import ValidationExceptions
from app.utils.utilities import FILLER as F
class checkBody():
    '''
    This Mixin will do :
    1. Check for empty Body
    2. Valid JSON input Stream Sent by User.
    '''
    def dispatch(self,request,*args,**kwargs):
        if(request.method == F.POST or request.method == F.PATCH):            
            if(len(request.body) == 0):
                raise ValidationExceptions({F.BODY : F.EMPTY_BODY})
            else:
                try:
                    json.loads(request.body)
                except:
                    raise ValidationExceptions({F.BODY : F.INVALID_JSON_STREAM})
        return super().dispatch(request, *args, **kwargs)
