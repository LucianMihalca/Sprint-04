# API ToDo-List Clean Architecture

> [!NOTE]
> En esta etapa del proyecto, nuestro objetivo es implementar un servidor con <br> ⚡️
> [![Express.js](https://img.shields.io/badge/-Expressjs-black?style=flat&logo=express)](https://expressjs.com/)<br>
> Este servidor se encargará de gestionar la API REST para nuestra lista de tareas (ToDo-List).<br>
> Emplearemos Clean Architecture, asegurando un desarrollo escalable y organizado, facilitando la separación de preocupaciones así como adaptaciones y expansiones eficientes en el futuro.

#

> [!TIP]
>
> **Características Clave del Proyecto**
>
> ⚡️ Código en TypeScript para mayor robustez y mantenibilidad.<br>
> ⚡️ Pruebas Testing para calidad y fiabilidad.<br>
> ⚡️ CI con GitHub Actions para automatizar pruebas y cambios.

#

> [!IMPORTANT]
> Nivel ⭐️
>
> ✅ Documenta y adjunta las comprobaciones con Postman o Insomnia en tu proyecto.

#

> [!IMPORTANT]
> Nivel ⭐️⭐️
>
> ✅ Incluye un middleware que añada la cabecera Cache-control: no-cache.<br>
> ✅ Habilite CORS (Cross-Origin Resource Sharing) en las respuestas, sea mediante Express o mediante otro middleware.<br>
> ✅ Añade un middleware devuelva un HTTP Status 401 - Unauthorized si la cabecera de la petición no contiene autenticación básica (usuario y contraseña).

#

> [!IMPORTANT]
> Nivel ⭐️⭐️⭐️
>
> ✅ Añade testing para comprobar el correcto funcionamiento de la API.

#

# Pasos para Utilizar el Proyecto

**1. Preparación del Entorno**

> Antes de iniciar, asegúrate de tener instalado en tu sistema:<br>

> [!IMPORTANT]
>
> [![Node.js](https://img.shields.io/badge/-Nodejs-black?style=flat&logo=Node.js)](https://nodejs.org/)
>
> [![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

Estos son esenciales para ejecutar y gestionar las dependencias del proyecto.

#

**2. Clonación del Repositorio**

> Clona el repositorio del proyecto a tu máquina local utilizando

```
git clone [https://github.com/LucianMihalca/Sprint-04.git]
```

#

**3. Instalación de Dependencias**

> Para instalar todas las dependencias necesarias navega a la carpeta del proyecto y ejecuta:

```
npm install
```

#

**4. Para transpilar el proyecto**

> Transpila el código TypeScript en JavaScript en la carpeta ./dist..

```
npm run build
```

#

**5. Iniciando el Proyecto**

> Esto iniciar el servidor y pondrá en marcha el servidor Express.js y podrás empezar a utilizar la API REST de la lista de tareas.

```
npm run start
```

## 6. Mapa del Proyecto

Revisa la documentación adjunta para entender la estructura del proyecto y cómo interactuar con las distintas partes de la API.

## 7. Pruebas y Experimentación

Experimenta con las diferentes funcionalidades de la API, utilizando herramientas como Postman o cURL para enviar solicitudes y recibir respuestas.

## Estructura de Carpetas y Directorios

```

├── __tests__
│   ├── application
│   │   └── TodoServices.test.ts
│   └── controller
│       ├── delete
│       │   └── delete-TodoController.test.ts
│       ├── get
│       │   └── get-TodoController.test.ts
│       ├── post
│       │   └── post-TodoController.test.ts
│       └── put
│           └── put-TodoController.test.ts
├── application
│   └── TodoService.ts
├── domain
│   ├── entities
│   │   └── Todo.ts
│   └── interfaces
│       └── IIdGenerator.ts
├── index.ts
├── infrastructure
│   ├── adapters
│   │   ├── controller
│   │   │   └── TodoController.ts
│   │   ├── middlewares
│   │   │   ├── basicAuthMiddleware.ts
│   │   │   ├── loggerMiddleware.ts
│   │   │   └── noCacheMiddleware.ts
│   │   └── routes
│   │       └── todoRoutes.ts
│   └── services
│       ├── idGenerator
│       │   └── UuidGenerator.ts
│       └── logger
│           └── logger.ts
└── repositories
    └── TodoRepository.ts

```

## TodoService (application/TodoService.ts)

> El TodoService es una clase central en la aplicación, encargada de manejar las operaciones relacionadas con los objetos Todo.
> Utiliza el patrón de diseño repositorio, implementando la interfaz TodoRepository, y se encarga de las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de los Todo.
