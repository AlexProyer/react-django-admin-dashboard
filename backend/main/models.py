from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """
    Modelo que extiende el modelo User de Django para agregar información adicional.
    - user: Relación uno a uno con el modelo User de Django.
    - is_admin: Indica si el usuario tiene privilegios de administrador.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)


class UserSession(models.Model):
    """
    Modelo que registra las sesiones de los usuarios.
    - user: Usuario asociado a la sesión.
    - login_time: Hora de inicio de la sesión.
    - logout_time: Hora de cierre de la sesión (puede ser nula si la sesión está activa).
    - duration: Duración de la sesión (calculada automáticamente al cerrar sesión).
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)  # Se establece automáticamente al crear la sesión
    logout_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    def __str__(self):
        return f'Session for {self.user.username} from {self.login_time}'

class ButtonClick(models.Model):
    """
    Modelo que registra los clics realizados por los usuarios en botones específicos.
    - user: Usuario que realizó el clic.
    - button_number: Número del botón (1 o 2).
    - click_time: Hora en que se realizó el clic.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    button_number = models.IntegerField()  # 1 o 2
    click_time = models.DateTimeField(auto_now_add=True)