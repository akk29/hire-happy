from django.urls import path
from app.controllers.admin_controller import AdminApplicationController , AdminJobsController , AdminUsersController , AdminLoginController
from app.controllers.application_controller import ApplicationController
from app.controllers.authentication_controller import SignupController , LoginController , ResetPasswordController, VerifyTokenController, ChangePasswordView
from app.controllers.jobs_controller import JobController

urlpatterns = [
    path('api/v1/signup', SignupController.as_view(),name='signup'),
    path('api/v1/login', LoginController.as_view(),name='signup'),
    path('api/v1/forgot', ResetPasswordController.as_view(), name='forgot' ),
    path('api/v1/verify/<uidb64>/<token>', VerifyTokenController.as_view(), name='forgot' ),
    path('api/v1/change-password', ChangePasswordView.as_view(), name='change-password' ),
    path('api/v1/jobs', JobController.as_view(),name='jobs'),
    path('api/v1/applications', ApplicationController.as_view(),name='applications'),    
    
    path('api/v1/admin/applications', AdminApplicationController.as_view(),name='admin-applications'),        
    path('api/v1/admin/jobs', AdminJobsController.as_view(),name='admin-jobs'),    
    path('api/v1/admin/users', AdminUsersController.as_view(),name='admin-users'),    
    path('api/v1/admin/login', AdminLoginController.as_view(),name='admin-login'),    

]