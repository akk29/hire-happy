import os
from decouple import config
from corsheaders.defaults import default_methods

ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS  = True
CORS_ALLOW_METHODS = [*default_methods]

AUTH_USER_MODEL = 'app.User'

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG',cast = bool)
SEND_MAIL = config('SEND_MAIL',cast = bool)

DB = config('DB')

INFO_EMAIL = config('INFO_EMAIL')
RESET_EMAIL = config('RESET_EMAIL')

FRONT_URL = config('FRONT_URL')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_PORT = config('EMAIL_PORT')

THROTTLE_RATE = config('THROTTLE_RATE')

CELERY_BROKER_URL = config('CELERY_BROKER_URL')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = config('CELERY_TASK_SERIALIZER')

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_URL = '/static-files/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static-files/')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app',
    'corsheaders',
    'drf_spectacular'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'app.core.exception_processor.ExceptionsProcessorMiddleware'
]

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {        
        'user': THROTTLE_RATE,
        'anon': THROTTLE_RATE
    },
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Hire Happy Rest API',
    'DESCRIPTION': 'Hire Happy is a Job recruitement portal',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False
}

ROOT_URLCONF = 'hirehappy.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'hirehappy.wsgi.application'

if(DB == "sqllite3"):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
elif(DB == "mysql"):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': config('DATABASE'),
            'USER': config('DBUSER'),
            'PASSWORD': config('DBPASSWORD'),
            'HOST': config('DBHOST'),
            'PORT': config('DBPORT'),
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'app.core.user_authentication.CustomUserAuthentication',
]



