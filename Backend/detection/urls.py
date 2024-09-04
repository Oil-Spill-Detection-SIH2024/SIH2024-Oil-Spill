# detection/urls.py
from django.urls import path
from .views import submit_ais_data, submit_sar_data, CustomAuthToken, logout

urlpatterns = [
    path('ais/', submit_ais_data),
    path('sar/', submit_sar_data),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('api-token-logout/', logout),
]
