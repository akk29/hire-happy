from marshmallow import ValidationError
from app.core.exceptions import ValidationExceptions

class ValidationProcessor():
    
    def __init__(self):
        self.data = None
        self.ValidatorRules = None

    def load_data(self,Validator,**data):        
        self.data = data
        self.ValidatorRules = Validator()

    def validate(self,Validator,**data):
        self.load_data(Validator,**data)
        try:
            self.ValidatorRules.load(self.data)
        except ValidationError as err:            
            raise ValidationExceptions(err)