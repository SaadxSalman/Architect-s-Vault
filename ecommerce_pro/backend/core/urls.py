from django.contrib import admin
from django.urls import path
# Add OrderCreateView to the import list below
from api.views import ProductListView, OrderCreateView, RegisterView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),
    
    # Products API
    path('api/products/', ProductListView.as_view()),
    
    # Orders API (The one that was causing the error)
    path('api/orders/', OrderCreateView.as_view()),
    
    # JWT Authentication Endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Swagger Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),

    path('api/register/', RegisterView.as_view()),
]