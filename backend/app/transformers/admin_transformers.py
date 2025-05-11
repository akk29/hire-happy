from app.models.users import profileTyepMapping
from app.utils.utilities import FILLER as F
from app.transformers.base_transformer import get_payload
class AdminTransformer():

    @staticmethod
    def transform_jobs(total,jobs,limit,offset):
        payload = get_payload(limit,offset,total)
        transformed_jobs = []
        if(total > 0):
            for job in jobs:
                full_name = '{} {}'.format(job.user_id.first_name,job.user_id.last_name )            
                single_job = {
                                F.UUID : job.uuid.hex,
                                F.TITLE : job.title,
                                F.DESCRIPTION : job.description,
                                F.LOCATION : job.location, 
                                F.POSTED_BY : full_name                  
                            }                                   
                transformed_jobs.append(single_job)        
        payload[F.JOBS] = transformed_jobs          
        return payload

    @staticmethod
    def transform_users(total,users,limit,offset):
        payload = get_payload(limit,offset,total)
        transformed_users = []
        if(total > 0):
            for user in users:            
                single_user = {
                                F.UUID : user.uuid.hex,
                                F.FIRST_NAME : user.first_name,
                                F.LAST_NAME : user.last_name,
                                F.EMAIL : user.email,
                                F.ROLE : profileTyepMapping[int(user.profiletype)]
                            }                                   
                transformed_users.append(single_user)        
        payload[F.USERS] = transformed_users 
        return payload

    @staticmethod
    def transform_applications(total,applications,limit,offset):
        payload = get_payload(limit,offset,total)
        transformed_applications = []
        if(total > 0):
            for application in applications:
                recrutier = "{} {}".format(application.job_id.user_id.first_name,application.job_id.user_id.last_name)
                candidate = "{} {}".format(application.user_id.first_name , application.user_id.last_name)
                single_application = {
                    F.UUID : application.uuid.hex,
                    F.TITLE : application.job_id.title,
                    F.LOCATION : application.job_id.location,
                    F.POSTED_BY : recrutier,
                    F.APPLIED_BY : candidate                                          
                }                                  
                transformed_applications.append(single_application)        
        payload[F.APPLICATIONS] = transformed_applications       
        return payload

