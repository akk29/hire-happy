from app.transformers.base_transformer import get_payload
from app.utils.utilities import FILLER as F

class JobTransformer:

    @staticmethod
    def transform_jobs(total, limit, offset, jobs):
        payload = get_payload(limit,offset,total)        
        transformed_jobs = []
        if total > 0:
            for job in jobs:
                full_name = "{} {}".format(
                    job.user_id.first_name, job.user_id.last_name
                )
                single_job = {
                    F.UUID: job.uuid.hex,
                    F.TITLE: job.title,
                    F.DESCRIPTION: job.description,
                    F.LOCATION: job.location,
                    F.POSTED_BY: full_name,
                }
                transformed_jobs.append(single_job)
        payload[F.JOBS] = transformed_jobs
        return payload
