from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from .views import UserSessionViewSet, ButtonClickViewSet, login_view, logout_view, get_active_session
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuración de la vista de Swagger/ReDoc
schema_view = get_schema_view(
    openapi.Info(
        title="API de Consola de Administración",
        default_version='v1',
        description="Documentación de la API para la consola de administración",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'sessions', UserSessionViewSet)
router.register(r'clicks', ButtonClickViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', login_view, name='login'),
    path('api/logout/', logout_view, name='logout'),
    path('api/user-session/', get_active_session, name='user-session'),
    re_path(r'^api/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^api/swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^api/redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]