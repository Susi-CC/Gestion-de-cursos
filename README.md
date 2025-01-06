# Practica de consolidación del módulo 7 
# "Acceso a datos en aplicaciones NODE"
## Curso FullStack JavaScript

Este proyecto implementa un sistema de gestión de cursos Bootcamp con funcionalidades CRUD para usuarios y cursos, desarrollado con Node.js y Sequelize.

## Características

- Creación, lectura, actualización y eliminación (CRUD) de usuarios y cursos.
- Asociación entre usuarios y cursos.
- Uso de Sequelize como ORM para la interacción con la base de datos PostgreSQL.
- Configuración modular para facilitar la escalabilidad.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) v14 o superior
- [PostgreSQL](https://www.postgresql.org/)
- npm v6 o superior

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Susi-CC/Gestion-de-cursos.git
   cd Gestion-de-cursos
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura la base de datos:

   - Crea una base de datos llamada `db_bootcamp` en PostgreSQL.
   - Configura el archivo `config/db.config.js` con tus credenciales de base de datos.

4. Ejecuta las migraciones y sincronización:

   ```bash
   npm run sync-db
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:3000` por defecto.

## Estructura del Proyecto

```plaintext
├── app
│   ├── controllers
│   │   ├── user.controller.js
│   │   └── bootcamp.controller.js
│   ├── models
│   │   ├── user.model.js
│   │   └── bootcamp.model.js
│   └── routes
│       ├── user.routes.js
│       └── bootcamp.routes.js
├── config
│   └── db.config.js
├── server.js
└── package.json
```

## Funcionalidades Principales

### Usuarios

- Crear usuarios
- Listar usuarios
- Consultar usuarios por ID
- Actualizar usuarios
- Eliminar usuarios

### Cursos (Bootcamps)

- Crear cursos
- Listar cursos
- Consultar cursos por ID
- Asociar usuarios a cursos

## Endpoints

### Usuarios

- `POST /users` - Crear un nuevo usuario
- `GET /users` - Listar todos los usuarios
- `GET /users/:id` - Consultar un usuario por ID
- `PUT /users/:id` - Actualizar un usuario por ID
- `DELETE /users/:id` - Eliminar un usuario por ID

### Cursos

- `POST /bootcamps` - Crear un nuevo curso
- `GET /bootcamps` - Listar todos los cursos
- `GET /bootcamps/:id` - Consultar un curso por ID
- `POST /bootcamps/:bootcampId/users/:userId` - Asociar un usuario a un curso

## Tecnologías Utilizadas

- Node.js
- Express
- Sequelize
- PostgreSQL

## Licencia

Este proyecto está bajo la Licencia ISC. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por contribuir al desarrollo de este proyecto! 🎉
