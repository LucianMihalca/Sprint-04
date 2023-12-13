import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import todoRouter from './infrastructure/adapters/routes/todoRoutes';
import { noCacheMiddleware } from './infrastructure/adapters/middlewares/noCacheMiddleware';
import { basicAuthMiddleware } from './infrastructure/adapters/middlewares/basicAuthMiddleware';
import { loggerMiddleware } from './infrastructure/adapters/middlewares/loggerMiddleware';

dotenv.config();
const app = express();


// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware de logging para registrar detalles de cada solicitud
app.use(loggerMiddleware);

// Middleware CORS para permitir el intercambio de recursos de origen cruzado
app.use(cors());

// Middleware para prevenir el almacenamiento en caché de respuestas por los navegadores y proxies
app.use(noCacheMiddleware);

// Middleware de autenticación básica para proteger las rutas
app.use(basicAuthMiddleware);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas para la funcionalidad de Todo
app.use('/', todoRouter);

// Iniciar el servidor y escuchar en el puerto especificado
const port: number = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
