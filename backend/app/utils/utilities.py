import bcrypt, hashlib, jwt 
from hirehappy.settings import SECRET_KEY, FRONT_URL
from app.models.users import profileTyepMapping

class FILLER:
    # global / common
    APPLICATION_JSON = 'application/json'
    CREATED = 'created'
    SUCCESS = 'success'
    TOKEN = "token"
    UIDB64 = 'uidb64'
    CODE = 'code'
    MESSAGE = 'message'
    UPDATED = 'updated'
    APPLIED = 'applied'
    ROLE = 'role'
    LIMIT = 'limit'
    OFFSET = 'offset'
    COUNT = 'count'
    USER_ID = 'user_id'
    META_DATA = "metadata"
    RESULT_SET = "resultset"
    ID = 'id'
    UUID = 'uuid'
    AUTHORIZATION = 'Authorization'
    FIRST_NAME = 'first_name'
    LAST_NAME = 'last_name'
    DATA = 'data'
    CACHE_CONTROL = 'cache-control'
    PRIVATE = 'private'
    LAST_MODIFIED = 'Last-Modified'
    LOCATION = "location"
    JOB_ID = 'job_id'
    POST = "POST"
    PATCH = "PATCH"
    UPDATE = "update"
    CREATE = "create"
    SUPERUSER = "SuperUser"
    RECRUITER = "Recruiter"
    CANDIDATE = "Candidate"
    APPLIED_BY = "applied_by"
    CREATED_AT = 'created_at'
    CREATED_AT_DSC = '-created_at'
    APPLICATION_FOR_APPLIED_BY = 'Application for {} applied by {}'
    JOB_POSTED_BY = '{} at {} posted by {}'
    WARNING_ERROR = "warning_error"
    APPLICATION_RECEIVED = "Application Recieved"
    APPLICATION_RECEIVED_RECRUITER = 'Dear Recruiter, You have recieved the application'
    APPLICATION_APPLIED = 'Application Applied'
    JOB_APPLIED_CANDIDATE = 'Dear Candidate , You have applied to Job'
    Users = "Users"
    User = "User"

    # errors
    ERRORS = 'errors'
    REQUEST_URL_NOT_FOUND = 'Requested url not found'
    INTERNAL_SERVER_ERROR = 'Internal Server Error'
    AUTHENICATION_ERROR = 'Authentication Error'
    FORBIDDEN = 'Forbidden'
    NOT_FOUND = 'Not Found'
    METHOD_NOT_ALLOWED = 'Method not Allow'
    VALIDATION_FAILED = 'Validation Failed'

    # application_validators
    INVALID_UUID = 'Invalid uuid'
    JOB = 'Job'
    JOB_APPLICATION_NOT_ALLOW = '''Can't apply to job'''
    ALREADY_APPLIED_TO_JOB = 'Already Applied to Job'

    # auth_validators
    INVALID_PROFILE_TYPE = 'Profile Type can only have 1 or 2 value'
    PASSWORD_CRITERIA_FAILED_LETTER = 'Password must contain at least 1 letter.'
    PASSWORD_CRITERIA_FAILED_DIGIT= 'Password must contain at least 1 digit.'
    ALREADY_REGISTERED_EMAIL = 'Email Already Registered'
    SAME_PASSWORD = 'Please Enter Same Password'
    EMAIL_NOT_FOUND = 'Email not found'
    INVALID_CREDENTIALS = 'Invalid credentials'
    INVALID_TOKEN_USER = 'Invalid Token / User'
    EMAIL = 'email'
    MSG = 'msg'
    TOKEN = 'token'
    PASSWORD = 'password'
    CONFIRM_PASSWORD = 'confirm_password'
    PROFILE_TYPE = 'profiletype'
    ETAG = 'ETag'

    # job validators
    INVALID_JOB_ID = 'Invalid Job Id'

    # job transformers
    JOBS = "jobs"
    TITLE = "title"
    DESCRIPTION = "description"    
    POSTED_BY = "posted_by"    
    
    # admin transformers
    USERS = "users"
    APPLICATIONS = "applications"

    # utilities
    HS256 = "HS256"
    UTF8 = "utf-8"

    # authentication services
    SALT = "salt"
    SUBJECT = "subject"
    SENDER = "sender"
    RESET_PASSWORD = "Reset Password"
    RECIEVER = "reciever"

    # mixins
    INVALID_TOKEN = 'Invalid Token'
    PREFIX_ERROR = 'Prefix Error'
    AUTHORIZATION_HEADER_MISSING = 'Authorization Header Missing'
    BEARER = 'Bearer'
    BEARER_PREFIX_ERROR = 'Please Keep Bearer as prefix'
    AUTHORIZATION_DATA_MISSING = 'Authorization Data is Missing'
    USER_DOESNOT_EXIST = '''User Doesn't Exist. Please Enter Valid Token'''
    JOB_NOT_FOUND = "Job Not Found"
    PERMISSION_DENIED = 'permission denied'
    ONLY_RECRUITER_ALLOWED = "Only Recruiter are allowed to {} Job"
    ACCESS_DENIED = "access denied"
    UNABLE_TO_EDIT_JOB = "Unable to edit Jobs posted by other Recruiters"
    BODY = "Body"
    EMPTY_BODY = "Empty Body"
    INVALID_JSON_STREAM = "Invalid JSON stream"
    RECRUITER_CANNOT_APPLY = '''Recruiter can't apply to Job'''
    INCORRECT_PASSWORD = 'incorrect password'

F = FILLER

def generate_token(user):
    payload = {F.ID : user.id , F.EMAIL  : user.email , F.ROLE : profileTyepMapping[int(user.profiletype)]}    
    return jwt.encode(payload,SECRET_KEY,algorithm=F.HS256).decode(F.UTF8) 

def user_details_from_token(Token):
    return jwt.decode(Token,SECRET_KEY,algorithm=F.HS256)

def user_token_from_request(request):
    return request.headers[F.AUTHORIZATION].split()[1]

def generate_salt_for_user():
    return bcrypt.gensalt()

def generate_hash_password(password,salt):    
    return bcrypt.hashpw(password.encode(F.UTF8), salt)

def get_user_payload(code,message,User):
    token = generate_token(User)
    payload = {            
            F.CODE : code,
            F.MESSAGE : message,
            F.DATA : {
                F.TOKEN : token, 
                F.UUID : User.uuid.hex,
                F.FIRST_NAME : User.first_name,
                F.LAST_NAME : User.last_name,
                F.ROLE : profileTyepMapping[int(User.profiletype)],
                F.EMAIL: User.email,
                }
            }
    return payload

def create_reset_message(uidb64,token,full_name):
    return(f''' 
    <html> 
    Hello <b> {full_name} </b> !,
    <br/>
    You are recieving this email because we have recieved a password reset 
    request for your Account
    <br/>
    Click on link to reset your password (Valid for 1 hr. & Only for One time)
    <br/>
    {FRONT_URL}/verify/{uidb64}/{token}
    </html>''')

def calculate_e_tag(last_entry):
    return hashlib.md5(str(last_entry).encode()).hexdigest() 

def caching_headers(response,last_entry=None):
    response[F.CACHE_CONTROL] = F.PRIVATE    
    response[F.LAST_MODIFIED] = last_entry 
    response[F.ETAG] = calculate_e_tag(last_entry)
    return response


