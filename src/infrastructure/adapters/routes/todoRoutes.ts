import { TodoService } from '../../../application/TodoService';
import { TodoController } from '../controller/TodoController';
import { UuidGenerator } from '../../../infrastructure/services/idGenerator/UuidGenerator';
import express from 'express';

/**
 * Crea una nueva instancia de Router de Express.
 * Este router actúa como un mini-aplicativo que puede tener su propio middleware y rutas.
 */
const router = express.Router();

/**
 * Crea una instancia de UuidGenerator, que se utiliza para generar identificadores únicos
 * para cada instancia de Todo. UuidGenerator es una implementación concreta de la interfaz
 * IIdGenerator que utiliza la función UUID v4 para generar IDs aleatorios.
 */
const idGenerator = new UuidGenerator();

/**
 * Crea una instancia de TodoService, inyectando la dependencia idGenerator.
 * TodoService es responsable de la lógica de negocio y manejo de datos para las entidades Todo,
 * utilizando el idGenerator para asignar un identificador único a cada Todo.
 */
const todoService = new TodoService(idGenerator);

/**
 * Crea una instancia de TodoController, inyectando la dependencia todoService.
 * TodoController es responsable de manejar las solicitudes y respuestas HTTP,
 * delegando las operaciones de negocio a todoService.
 */
const todoController = new TodoController(todoService);

/**
 * Define las rutas para las operaciones CRUD en los objetos Todo.
 * Cada ruta está asociada con un método específico en TodoController,
 * permitiendo la interacción con la entidad Todo a través de la API.
 */
router.get('/todos', (req, res) => todoController.getAllTodos(req, res));
router.post('/todos', (req, res) => todoController.addTodo(req, res));
router.put('/todos/:id', (req, res) => todoController.updateTodo(req, res));
router.delete('/todos/:id', (req, res) => todoController.removeTodo(req, res));

export default router;
