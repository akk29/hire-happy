from marshmallow import ValidationError
from app.error_handler.exceptions import ValidationExceptions

class RunValidatorOnData():
    
    def __init__(self):
        self.payload = None
        self.SchemaValidator = None

    def set_parameters(self,Validator,**payload):        
        self.payload = payload
        self.SchemaValidator = Validator()

    def fire(self,Validator,**payload):
        self.set_parameters(Validator,**payload)
        try:
            self.SchemaValidator.load(self.payload)
        except ValidationError as err:            
            raise ValidationExceptions(err)