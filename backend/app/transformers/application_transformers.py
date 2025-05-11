from app.utils.utilities import FILLER as F
from app.transformers.base_transformer import get_payload

class ApplicationTransformers():

    @staticmethod
    def transform_applications(role,total,applications,limit,offset):
        payload = get_payload(limit,offset,total)  
        transformed_applications = []
        if(total > 0):    
            for application in applications:
                single_application = {
                    F.UUID : application.uuid.hex,
                    F.TITLE : application.job_id.title,
                    F.LOCATION : application.job_id.location,                    
                }    
                if(role == F.RECRUITER): # get candidate info
                    applied_by = "{} {}".format(application.user_id.first_name,application.user_id.last_name)
                    single_application[F.APPLIED_BY] = applied_by
                if(role == F.CANDIDATE): # get recuiter info
                    posted_by = "{} {}".format(application.job_id.user_id.first_name,application.job_id.user_id.last_name)
                    single_application[F.POSTED_BY] = posted_by
                transformed_applications.append(single_application)        
        payload[F.APPLICATIONS] = transformed_applications
        return payload