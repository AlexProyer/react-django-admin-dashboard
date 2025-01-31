from rest_framework import serializers
from .models import UserProfile, UserSession, ButtonClick

class UserSessionSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo UserSession.
    Incluye información sobre las sesiones de los usuarios, como la hora de inicio,
    hora de cierre, duración y el nombre de usuario asociado.
    """
    username = serializers.CharField(source='user.username', read_only=True)  # Obtén el nombre de usuario

    class Meta:
        model = UserSession
        fields = ['id', 'login_time', 'logout_time', 'duration', 'user', 'username'] 

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo UserProfile.
    Incluye información extendida sobre los usuarios, como si tienen privilegios de administrador.
    """
    class Meta:
        model = UserProfile
        fields = '__all__'

class ButtonClickSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo ButtonClick.
    Registra los clics realizados por los usuarios en botones específicos.
    Valida que el número del botón sea 1 o 2.
    """
    class Meta:
        model = ButtonClick
        fields = '__all__'

    def validate_button_number(self, value):
        """
        Valida que el número del botón sea 1 o 2.
        """
        if value not in [1, 2]:
            raise serializers.ValidationError("El número del botón debe ser 1 o 2. Valores permitidos: [1, 2].")
        return value
