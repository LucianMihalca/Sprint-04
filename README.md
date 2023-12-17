# API ToDo-List Clean Architecture

> [!NOTE]
>
> En esta etapa, nuestro objetivo es implementar un servidor con ⚡️:<br>
>
> [![Express.js](https://img.shields.io/badge/-Expressjs-black?style=flat&logo=express)](https://expressjs.com/)<br>
> Este servidor se encargará de gestionar la API REST para nuestra lista de tareas (ToDo-List).<br>
> Emplearemos Clean Architecture, asegurando un desarrollo escalable y organizado, facilitando la separación de preocupaciones así como adaptaciones y expansiones eficientes en el futuro.

#

> [!TIP]
>
> 📂 **Características Clave del Proyecto**
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

# 💡 Pasos para Utilizar el Proyecto

**1. Preparación del Entorno**<br>

Antes de iniciar, asegúrate de tener instalado en tu sistema:<br>

> [!IMPORTANT]
>
> [![Node.js](https://img.shields.io/badge/-Nodejs-black?style=flat&logo=Node.js)](https://nodejs.org/)
>
> [![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

Estos son esenciales para ejecutar y gestionar las dependencias del proyecto.

#

**2. Clonación del Repositorio**<br>

Clona el repositorio a tu máquina local usando:

```
git clone https://github.com/LucianMihalca/Sprint-04.git
```

> [!IMPORTANT]
> Tras clonar, prepara el proyecto para tu uso personal:
>
> **Elimina el Directorio Git Existente:**<br>
>
> Esto remueve la historia previa y te permite empezar con un historial limpio.
>
> ```bash
>  rm -rf .git
> ```
>
> **Inicializa tu Propio Repositorio Git:**<br>
>
> En la raíz del proyecto clonado, inicia un nuevo repositorio Git:
>
> ```bash
> git init
> ```
>
> Esto te permite comenzar tu propio control de versiones.

#

**3. Instalación de Dependencias**<br>

Para instalar todas las dependencias necesarias navega a la carpeta del proyecto y ejecuta:

```
npm install
```

#

**4. Para transpilar el proyecto**<br>

Transpila el código TypeScript en JavaScript en la carpeta ./dist..

```
npm run build
```

#

**5. Iniciando el Proyecto**<br>

Para iniciar y poner en marcha el servidor Express.js, ejecuta el siguiente comando:

```
npm run start
```

Esto te permitirá empezar a utilizar la API REST de la lista de tareas.

#

**6. Ejecutar tests**

Para ejecutar los tests, usa el siguiente comando:

```
npm run test
```

> [!IMPORTANT]
> Para ejecutar los tests, que incluyen pruebas de los métodos de la API utilizamos supertest.
>
> `supertest` es una librería que nos permite realizar pruebas HTTP de alto nivel, imitando las llamadas al servidor en un entorno de prueba.
>
> Esto significa que puedes probar tus endpoints de la API, asegurándote de que respondan como se espera bajo diferentes circunstancias y entradas.

#

🌳 **Estructura de Carpetas y Directorios**

```

├── **tests**
│ ├── application
│ │ └── TodoServices.test.ts
│ └── controller
│ ├── delete
│ │ └── delete-TodoController.test.ts
│ ├── get
│ │ └── get-TodoController.test.ts
│ ├── post
│ │ └── post-TodoController.test.ts
│ └── put
│ └── put-TodoController.test.ts
├── application
│ └── TodoService.ts
├── domain
│ ├── entities
│ │ └── Todo.ts
│ └── interfaces
│ └── IIdGenerator.ts
├── index.ts
├── infrastructure
│ ├── adapters
│ │ ├── controller
│ │ │ └── TodoController.ts
│ │ ├── middlewares
│ │ │ ├── basicAuthMiddleware.ts
│ │ │ ├── loggerMiddleware.ts
│ │ │ └── noCacheMiddleware.ts
│ │ └── routes
│ │ └── todoRoutes.ts
│ └── services
│ ├── idGenerator
│ │ └── UuidGenerator.ts
│ └── logger
│ └── logger.ts
└── repositories
└── TodoRepository.ts

```

#

# Documentación de los Métodos del Controlador TodoController

> [!NOTA]
>
> 1.  Método getAllTodos
>
> Obtener Todos (Tareas)
>
> - Endpoint: /todos (GET)
> - Descripción: Retorna una lista de todas las tareas (Todos).
> - Éxito (200): Devuelve un arreglo de objetos Todo.
> - Error (500): Si ocurre un error inesperado, devuelve un mensaje de error.
