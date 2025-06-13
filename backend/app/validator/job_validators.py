from marshmallow import (Schema, fields, validates , validate,fields)
from app.core.exceptions import NotFoundException
from app.repository.database_factory import DatabaseFactory
from app.utils.utilities import FILLER as F

job_operations = DatabaseFactory.get_job_repository()
class JobCreationSchema(Schema):
    title = fields.Str(required=True,validate=validate.Length(min=3,max=50))
    description = fields.Str(required=True,validate=validate.Length(min=3,max=50))
    location = fields.Str(required=True,validate=validate.Length(min=3,max=50))

class JobUpdateSchema(Schema):
    uuid = fields.Str(required=True)
    title = fields.Str(required=True,validate=validate.Length(min=3,max=50))
    description = fields.Str(required=True,validate=validate.Length(min=3,max=50))
    location = fields.Str(required=True,validate=validate.Length(min=3,max=50))

    @validates(F.UUID)
    def validate_uuid(self,data,**kwargs):
        job = None
        try:
            job = job_operations.object_by_uuid(data)
        except:
            pass
        if(job is None):
            raise NotFoundException(F.JOB_ID,F.INVALID_JOB_ID)
