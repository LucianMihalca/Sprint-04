# API ToDo-List Clean Architecture

> [!NOTE]
> En esta etapa, implementaremos un servidor con 🔋 [![Express.js](https://img.shields.io/badge/-Expressjs-black?style=flat&logo=express)](https://expressjs.com/), para gestionar la API REST de nuestra lista de tareas .<br> 
> Utilizaremos Clean Architecture para asegurar un diseño eficiente y mantenible.

#

> [!TIP] 
> **Características Clave del Proyecto** 
> 
> ⚡️ Código en TypeScript para mayor robustez y mantenibilidad.<br>
> ⚡️ Pruebas Testing para calidad y fiabilidad.<br>
> ⚡️ CI con GitHub Actions para automatizar pruebas y cambios.

#

> [!IMPORTANT]
> Nivel ⭐️ <br><br>
> ✅ Documenta y adjunta las comprobaciones con Postman o Insomnia en tu proyecto.

#

> [!IMPORTANT]
> Nivel ⭐️⭐️ <br><br>
> ✅ Incluye un middleware que añada la cabecera Cache-control: no-cache.<br>
> ✅ Habilite CORS (Cross-Origin Resource Sharing) en las respuestas, sea mediante Express o mediante otro middleware.<br>
> ✅ Añade un middleware devuelva un HTTP Status 401 - Unauthorized si la cabecera de la petición no contiene autenticación básica (usuario y contraseña).

#

> [!IMPORTANT]
> Nivel ⭐️⭐️⭐️ <br><br>
> ✅ Añade testing para comprobar el correcto funcionamiento de la API.

Comandos:

Testing:

```sh
npm run test
```

Ejecuta los tests ignorando los que existan en dist/

Prettier format:

```sh
npm run prettier-format
```

Ejecuta manualmente el prettier en el proyecto, recomiendo instalar la extensión prettier y que se autoejecute al guardar.

Watcher:

```sh
npm run dev:watcher
```

Ejecuta nodemon usando src/index.ts como archivo inicial

Dev Run:

```sh
npm run dev:run
```

Ejecuta el proyecto sin watcher

Build:

```sh
npm run build
```

Transpila el proyecto en dist/

---

## Debugger

en el archivo .vscode/launch.json está la configuración del debugger.

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Lanza debug",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.ts",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

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

El TodoService es una clase central en la aplicación, encargada de manejar las operaciones relacionadas con los objetos Todo.
Utiliza el patrón de diseño repositorio, implementando la interfaz TodoRepository, y se encarga de las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de los Todo.

**Características Principales**:

Almacenamiento de Todos:

- Los objetos Todo se almacenan en un mapa (todosMap), utilizando su ID como clave para un acceso eficiente.

Inyección de Dependencias:

- El servicio depende de una interfaz IIdGenerator para la generación de identificadores únicos, lo que permite una fácil integración y testing.
  Métodos:
  Constructor: Inicializa el servicio con un generador de ID (idGenerator). Esto permite utilizar diferentes estrategias para la generación de IDs, como UUIDs.

- getAllTodos(): Retorna todos los Todo almacenados en forma de array. Utiliza Array.from() para convertir los valores del mapa en un array.

- getTodo(id: string): Busca un Todo específico por su ID y lo retorna. Si no se encuentra, devuelve undefined.

- addTodo(title: string): Crea un nuevo Todo con el título proporcionado, lo agrega al mapa y lo devuelve. El ID se genera utilizando el idGenerator.

- updateTodo(id: string): Encuentra un Todo por su ID y alterna su estado de completitud (isCompleted). Lanza un error si el Todo no se encuentra.

- removeTodo(id: string): Elimina un Todo del mapa utilizando su ID. Lanza un error si el Todo no se encuentra.

> [!NOTE]
> El TodoService es utilizado por los controladores para realizar operaciones en los objetos Todo.
> La abstracción del repositorio y el uso de un mapa como almacenamiento facilitan la manipulación de los datos y permiten una fácil expansión o modificación del servicio en el futuro.
