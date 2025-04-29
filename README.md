# TaskMaster API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## Descripción

TaskMaster API es una aplicación backend desarrollada con [NestJS](https://nestjs.com/) que proporciona servicios de gestión de tareas y usuarios. Esta API permite a los usuarios registrarse, iniciar sesión y gestionar tareas personales de forma segura.

## Características

- **Autenticación de usuarios:** Sistema completo con registro, login y gestión de perfiles
- **Gestión de tareas:** Crear, leer, actualizar y eliminar tareas
- **Validación de datos:** Implementada con class-validator y class-transformer
- **Base de datos MongoDB:** Almacenamiento persistente usando Mongoose
- **Seguridad:** Autenticación con JWT, encriptación de contraseñas con bcrypt
- **API RESTful:** Endpoints bien estructurados siguiendo las mejores prácticas

## Estructura del Proyecto

```
taskmaster-api/
├── src/                          # Código fuente
│   ├── auth/                     # Módulo de autenticación
│   │   ├── guards/               # Guards para proteger rutas
│   │   └── strategies/           # Estrategias de autenticación
│   ├── common/                   # Código compartido
│   │   └── filters/              # Filtros para manejo de excepciones
│   ├── tasks/                    # Módulo de tareas
│   │   ├── dto/                  # Objetos de transferencia de datos
│   │   └── schemas/              # Esquemas de Mongoose
│   ├── users/                    # Módulo de usuarios
│   │   ├── dto/                  # DTOs para usuarios
│   │   └── schemas/              # Esquema de usuario
│   ├── app.module.ts             # Módulo principal
│   └── main.ts                   # Punto de entrada
└── test/                         # Pruebas
```

## Requisitos Previos

- Node.js (v16 o superior)
- MongoDB
- npm o yarn

## Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <url-del-repositorio>

# Instalar dependencias
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MONGODB_URI=mongodb://localhost:27017/taskmaster
JWT_SECRET=tu_secreto_seguro
PORT=3000
```

## Ejecución

```bash
# Desarrollo
npm run start

# Modo observador (recomendado para desarrollo)
npm run start:dev

# Producción
npm run start:prod
```

## Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## Endpoints API

### Usuarios

- `POST /users` - Registrar un nuevo usuario
- `GET /users/profile` - Obtener perfil del usuario autenticado
- `PUT /users/profile` - Actualizar perfil de usuario

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/refresh` - Refrescar token

### Tareas

- `GET /tasks` - Obtener todas las tareas del usuario
- `POST /tasks` - Crear nueva tarea
- `GET /tasks/:id` - Obtener detalle de una tarea
- `PUT /tasks/:id` - Actualizar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

## Tecnologías Utilizadas

- **NestJS:** Framework para construir aplicaciones de servidor eficientes y escalables
- **MongoDB:** Base de datos NoSQL
- **Mongoose:** ODM para MongoDB
- **JWT:** JSON Web Tokens para autenticación
- **Passport:** Middleware de autenticación
- **bcrypt:** Librería para encriptación de contraseñas
- **class-validator & class-transformer:** Validación y transformación de datos

## Contribución

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
