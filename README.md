# Consola de Administración con Django y React - Prueba Técnica

## Descripción
Este proyecto es una consola de administración desarrollada con Django (backend) y React (frontend). Permite a un administrador ver analíticos sobre los usuarios registrados, mientras que los usuarios regulares pueden interactuar con una landing page que incluye botones contadores.

## Documentación de la API
La documentación de la API fue generada usando [drf-yasg](https://drf-yasg.readthedocs.io/).
La documentación de la API está generada automáticamente usando **drf-yasg**. Puedes acceder a ella desde las siguientes URLs:

### Swagger UI
Swagger es una interfaz interactiva que te permite explorar y probar los endpoints de la API. (Se ingresa al siguiente link con el servidor DJango iniciado, no es un dominio)

- **URL**: [http://127.0.0.1:8000/api/swagger/](http://127.0.0.1:8000/api/swagger/)

### ReDoc
ReDoc es una documentación estática y más limpia de la API. (Se ingresa al siguiente link con el servidor DJango iniciado, no es un dominio)

- **URL**: [http://127.0.0.1:8000/api/redoc/](http://127.0.0.1:8000/api/redoc/)

---

### Explicación de la sección
1. **Swagger UI**:
   - Proporciona una interfaz interactiva donde los usuarios pueden probar los endpoints de la API directamente desde el navegador.
   - Es ideal para desarrolladores que quieren explorar la API rápidamente.

2. **ReDoc**:
   - Ofrece una documentación estática y más limpia, ideal para usuarios que solo quieren leer la documentación sin interactuar con la API.

3. **Instrucciones claras**:
   - Incluye pasos sencillos para acceder a la documentación, como iniciar el servidor de Django y visitar las URLs proporcionadas.

---

## Funcionalidades

- Autenticación de usuarios (admin y usuarios regulares).
- Landing page para usuarios regulares con dos botones contadores.
- Consola de administración con gráficos y estadísticas de uso.
- Almacenamiento de datos de sesión y clics en los botones.

## Requisitos previos
Asegúrate de tener instalado lo siguiente en tu sistema:
- Python 3
- Node.js 
- npm
- Git

## Tecnologías utilizadas

- **Backend**: Django, Django REST Framework.
- **Frontend**: React, Ant Design.
- **Base de datos**: SQLite.
- **Otras herramientas**: Chart.js (para gráficos), React Router (para navegación).

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlexProyer/react-django-admin-dashboard
   ```
2. Ve al directorio del proyecto: 
    ```bash
    cd pruebaTecnica
    ```
3. Ve al directorio del backend: 
    ```bash
    cd backend
    ```
4. Instala las dependencias del backend: 
   ```bash
   pip install -r requirements.txt
   ```
5. Vuelve una carpeta atrás e ingresa al directorio del frontend: 
   ```bash
   cd ..
   cd frontentd
   ```
6. Instala las dependencias del frontend: 
    ```bash 
    npm install
    ```
7. Vuelve una carpeta atrás e ingresa al directorio del backend nuevamente:
   ```bash
   cd ..
   cd backend
   ``` 
8. Configura la base de datos:  
   ```bash
   python manage.py migrate
   ```
9. Crea un superusuario (admin):  
   ```bash
   python manage.py createsuperuser
   ```
10. Ejecuta el servidor de Django:  
   ```bash
   python manage.py runserver
   ```
12. Abre una terminal e ingresa al directorio del frontend (../pruebaTecnica/frontend)
    ```bash 
    cd frontend
    ```
11. Ejecuta el servidor de React: 
    ```bash 
    npm start
    ```

### Uso

- **Usuario Admin**:
  - Inicia sesión con las credenciales de administrador.
  - Accede a la consola de administración para ver las estadísticas de los usuarios.
  - Puede interactuar con la landing page y presiona los botones contadores.
  - Cierra sesión con un botón LogOut
- **Usuario Regular**:
  - Inicia sesión con las credenciales de usuario regular.
  - Interactúa con la landing page y presiona los botones contadores.
  - Cierra sesión con un botón LogOut

### Estructura del proyecto
```
Prueba Tecnica/
├── Backend/
│   ├── backend/               # Carpeta principal de configuración de Django
│   │   ├── __init__.py        # Archivo de inicialización
│   │   ├── asgi.py            # Configuración ASGI
│   │   ├── settings.py        # Configuración principal del proyecto
│   │   ├── urls.py            # Rutas principales del backend
│   │   └── wsgi.py            # Configuración WSGI
│   │
│   ├── main/                  # Aplicación principal de Django
│   │   ├── migrations/        # Migraciones de la base de datos
│   │   ├── __pycache__/       # Caché de Python (generado automáticamente)
│   │   ├── __init__.py        # Archivo de inicialización
│   │   ├── admin.py           # Registro de modelos en el admin
│   │   ├── apps.py            # Configuración de la aplicación
│   │   ├── models.py          # Modelos de la base de datos
│   │   ├── serializers.py     # Serializadores de DRF
│   │   ├── tests.py           # Pruebas unitarias
│   │   ├── urls.py            # Rutas de la aplicación
│   │   └── views.py           # Vistas de la API
│   │
│   ├── db.sqlite3             # Base de datos SQLite (desarrollo)
│   ├── manage.py              # Script de administración de Django
│   └── requirements.txt       # Dependencias de Python
│
├── Frontend/                  # Carpeta del frontend (React)
│   ├── node_modules/          # Dependencias de Node.js
│   ├── public/                # Archivos públicos (íconos, HTML base, etc.)
│   ├── src/                   # Código fuente de React
│   │   ├── components/        # Componentes de React
│   │   │   ├── AdminDashboard.js # Panel de administración del admin
│   │   │   ├── AdminSession.js   # Archivo que lee la API para traer la información de sesiones
│   │   │   ├── Login.js          # Panel de logeo
│   │   │   ├── LogoutButton.js   # Lógica para realizar logout y finalizar sesión
│   │   │   ├── ProtectedRoute.js # Lógica para proteger las rutas y accesos para tipo de usarios
│   │   │   ├── Layout.css        # Hoja de estilospara cosas específicas (Ya que usamos ANtDesign)
│   │   │   ├── Layout.js         # Componente para dejar un layout general
│   │   │   └── UserDashboard.js  # Panel del usuario
│   │   ├── App.js             # Componente principal de React
│   │   ├── index.js           # Punto de entrada de la aplicación
│   │   └── ...                # Otros archivos de React (CSS, hooks, context, etc.)
│   │
│   ├── .gitignore             # Archivos ignorados por Git
│   ├── package-lock.json      # Dependencias bloqueadas de Node.js
│   ├── package.json           # Dependencias y scripts de Node.js
│   └── README.md              # Documentación del frontend
│
└── README.md                  # Documentación principal del proyecto
```
