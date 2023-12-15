import { Request, Response } from 'express';
import { TodoService } from '../../../application/TodoService';
import { logger } from '../../services/logger/logger';

/**
 * Controlador para gestionar las operaciones relacionadas con los Todos.
 */
export class TodoController {
  /**
   * Inicializa el controlador con una instancia de TodoService.
   * @param todoService - Instancia de TodoService para gestionar la lógica de negocio de los Todos.
   */
  constructor(private todoService: TodoService) {}

  /**
   * Maneja la solicitud GET para obtener todos los Todos.
   * Registra la operación y responde con la lista de todos los Todos.
   */
  getAllTodos(req: Request, res: Response) {
    try {
      const todos = this.todoService.getAllTodos();
      logger.log(`Obteniendo todos los Todos`);
      res.json(todos);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error al obtener todos los elementos Todo: ${error.message}`);
        res.status(500).send(error.message);
      } else {
        res.status(500).send('Error desconocido al obtener todos los Todos');
      }
    }
  }

  /**
   * Maneja la solicitud POST para añadir un nuevo Todo.
   * Registra la operación y responde con el Todo recién creado.
   */
  addTodo(req: Request, res: Response) {
    try {
      const { title } = req.body;
      if (!title || title.trim() === '') {
        res.status(400).send('Título inválido');
        return;
      }
      const newTodo = this.todoService.addTodo(title);
      logger.log(`Todo añadido con título: ${title}`);
      res.status(201).json(newTodo);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error al añadir Todo: ${error.message}`);
        res.status(500).send(error.message);
      } else {
        res.status(500).send('Error desconocido al añadir el Todo');
      }
    }
  }

  /**
   * Maneja la solicitud PUT para actualizar un Todo existente.
   * Registra la operación y responde con el Todo actualizado.
   */
  updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const todoToUpdate = this.todoService.getTodo(id);

      if (!todoToUpdate) {
        logger.error(`Intento de actualizar un Todo no encontrado con id: ${id}`);
        return res.status(404).send('Todo no encontrado');
      }
      const updatedTodo = this.todoService.updateTodo(id);
      logger.log(`Todo actualizado con id: ${id}`);
      res.json(updatedTodo);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error al actualizar Todo: ${error.message}`);
        res.status(500).send(error.message);
      } else {
        res.status(500).send('Error desconocido al actualizar el Todo');
      }
    }
  }

  /**
   * Maneja la solicitud DELETE para eliminar un Todo existente.
   * Registra la operación y responde con el estado de la operación.
   */
  removeTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      this.todoService.removeTodo(id);
      logger.log(`Todo eliminado con id: ${id}`);
      res.status(200).send(`Todo eliminado con id: ${id}`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error al eliminar Todo: ${error.message}`);
        res.status(500).send(error.message);
      } else {
        res.status(500).send('Error desconocido al eliminar el Todo');
      }
    }
  }
}
