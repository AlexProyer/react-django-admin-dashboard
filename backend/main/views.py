from django.utils import timezone
from rest_framework import viewsets, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import UserSession, ButtonClick
from .serializers import UserSessionSerializer, ButtonClickSerializer

@api_view(['POST'])
def login_view(request):
    """
    Vista para iniciar sesión.
    - username: Nombre de usuario.
    - password: Contraseña.
    Retorna un token JWT y la información de la sesión activa.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user:
        # Busca si ya existe una sesión activa para el usuario
        user_session = UserSession.objects.filter(user=user, logout_time__isnull=True).first()

        if user_session:
            # Si existe una sesión activa, actualiza el tiempo de inicio de sesión
            user_session.login_time = timezone.now()
            user_session.save()
        else:
            # Si no existe, crea una nueva sesión
            user_session = UserSession.objects.create(user=user, login_time=timezone.now())

        refresh = RefreshToken.for_user(user)
        return Response({
            'user_type': 'admin' if user.is_staff else 'user',
            'token': str(refresh.access_token),  # <-- Token
            'user_id': user.id,
            'session_id': user_session.id
        })
    else:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def logout_view(request):
    """
    Vista para cerrar sesión.
    - user_id: ID del usuario que cierra sesión.
    Calcula la duración de la sesión y la guarda en la base de datos.
    """
    user_id = request.data.get('user_id')  # Obtén el ID del usuario de la solicitud

    # Busca el registro de sesión existente para este usuario
    user_session = UserSession.objects.filter(user_id=user_id, logout_time__isnull=True).first()

    if user_session:
        # Actualiza el logout_time y calcula la duración
        user_session.logout_time = timezone.now()
        user_session.duration = user_session.logout_time - user_session.login_time  # Calcula la duración
        user_session.save()  # Guarda los cambios en la base de datos

        # Calcula la duración en minutos
        duration_in_minutes = user_session.duration.total_seconds() / 60
        formatted_duration = f"{int(duration_in_minutes)} min" if duration_in_minutes >= 1 else "Less than 1 min"
        
        return Response({"message": "Logout exitoso", "sessionDuration": formatted_duration}, status=200)
    
    return Response({"message": "No se encontró sesión activa para este usuario"}, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_active_session(request):
    """
    Vista para obtener la sesión activa del usuario autenticado.
    Retorna los detalles de la sesión activa o un mensaje de error si no hay sesión activa.
    """
    user_session = UserSession.objects.filter(user=request.user, logout_time__isnull=True).first()
    if user_session:
        serializer = UserSessionSerializer(user_session)
        return Response(serializer.data)
    return Response({'error': 'No hay sesión activa'}, status=400)


class UserSessionViewSet(viewsets.ModelViewSet):
    queryset = UserSession.objects.all()
    serializer_class = UserSessionSerializer
    #permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ButtonClickViewSet(viewsets.ModelViewSet):
    queryset = ButtonClick.objects.all()
    serializer_class = ButtonClickSerializer
    #permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)