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

1. **Swagger UI**:
   - Proporciona una interfaz interactiva donde los usuarios pueden probar los endpoints de la API directamente desde el navegador.
   - Es ideal para desarrolladores que quieren explorar la API rápidamente.

2. **ReDoc**:
   - Ofrece una documentación estática y más limpia, ideal para usuarios que solo quieren leer la documentación sin interactuar con la API.

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

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

#### **1. Clona el repositorio**
Primero, clona el repositorio en tu máquina local:
```bash
git clone https://github.com/AlexProyer/react-django-admin-dashboard.git
cd react-django-admin-dashboard
```

#### **2. Configura el entorno virtual para el backend**
Es recomendable usar un entorno virtual para gestionar las dependencias del backend. Sigue estos pasos:

2.1 Crea un entorno virtual:
```bash
python -m venv venv
```
2.2 Activa el entorno virtual:
En Windows:
```bash
.\venv\Scripts\activate
```
En MacOS/Linux:
```bash
source venv/bin/activate
```
2.3 Instala las dependencias del backend:
```bash
cd backend
pip install -r requirements.txt
```
2.4 Configura la base de datos:
```bash
python manage.py migrate
python manage.py makemigrations
```
2.5 Ejecuta el servidor de Django:
```bash
python manage.py runserver
```

#### **2. Configura el frontend**
El frontend está construido con React. Sigue estos pasos para configurarlo:

3.1 Ve al directorio del frontend:
```bash
cd ../frontend
```
3.2 Instala las dependencias del frontend:
```bash
npm install
```
3.3 Ejecuta el servidor de desarrollo de React:
```bash
npm start
```
El frontend estará disponible en ```http://localhost:3000.```

#### **4. Inicia ambos servidores**
Para probar completamente el proyecto, necesitas ejecutar ambos servidores (backend y frontend):
Abre dos terminales separadas:
> En la primera terminal, asegúrate de que el servidor de Django esté en ejecución:
```bash
cd backend
python manage.py runserver
```
> En la segunda terminal, asegúrate de que el servidor de React esté en ejecución:
```bash
cd frontend
npm start
```

## Notas adicionales
#### Entorno virtual: Siempre usa un entorno virtual para evitar conflictos entre dependencias globales y locales.
#### Base de datos: Si usas una base de datos diferente a SQLite (por ejemplo, MySQL o PostgreSQL), asegúrate de configurarla en backend/settings.py.
#### Credenciales: Consulta el archivo CREDENCIALES.md para obtener las credenciales de prueba del proyecto.
#### Puertos: Si los puertos predeterminados (8000 para Django y 3000 para React) están ocupados, puedes cambiarlos en la configuración correspondiente.

## Uso

## Credenciales

Para probar el proyecto, consulta las [credenciales aquí](credenciales.md).

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
