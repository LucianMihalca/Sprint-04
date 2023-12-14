# Ejemplo básico de TS

---

En este ejemplo básico hay:

- ESLint
- Prettier
- ts-jest
- nodemon
- VSCode Debugging
- Github Actions
- Pequeño ejemplo de código funcional con import

La configuración del debugger apunta a src/index.ts como archivo de inicio del proyecto.

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

domain: Contiene la lógica de negocio pura (entidades y repositorios de dominio).
Todo.ts: Entidad Todo.
TodoRepository.ts: Interfaz del repositorio para abstraer la persistencia de datos.
/application: Lógica de aplicación, como servicios que utilizan entidades de dominio.
TodoService.ts: Servicios que contienen la lógica de aplicación, como añadir o eliminar tareas.
/infrastructure: Implementaciones específicas de infraestructura, como base de datos, API, y la web.
/persistence: Implementaciones concretas de los repositorios de dominio.
TodoLocalStorageRepository.ts: Implementación del repositorio usando localStorage.
TodoDatabaseRepository.ts: Implementación del repositorio usando una base de datos.
/api: Controladores y rutas para la API REST.
TodoController.ts: Controladores para manejar las solicitudes HTTP relacionadas con las tareas.
/web: Código relacionado con la interfaz de usuario.
TodoView.ts: Clase que maneja la representación y eventos de la interfaz de usuario.
TodoViewModel.ts: Representa un modelo intermedio entre la vista y la lógica de aplicación.
/config: Configuración del servidor y otras configuraciones globales.
server.ts: Configuración y lanzamiento del servidor Express.js.
/test: Pruebas unitarias y de integración para cada capa.

## Estructura de Carpetas y Directorios

```

├── __tests__
│   └── application
│       └── TodoServices.test.ts
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
