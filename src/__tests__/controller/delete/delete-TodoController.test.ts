import request from 'supertest';
import express, { Express } from 'express';
import { TodoController } from '../../../infrastructure/adapters/controller/TodoController';
import { TodoService } from '../../../application/TodoService';

// Mock para IIdGenerator
let mockIdGenerator = {
  generate: jest.fn(() => `mock-id-${Math.random()}`)
};

describe('TodoController', () => {
  let app: Express;
  let todoService: TodoService;
  let todoController: TodoController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    todoService = new TodoService(mockIdGenerator);
    todoController = new TodoController(todoService);

    // Conectar la ruta con el controlador

    app.delete('/todos/:id', (req, res) => todoController.removeTodo(req, res));
  });

  describe('DELETE / todos', () => {
    test('removeTodo debe manejar errores y responder con el código de estado adecuado', async () => {
      const nonExistentId = 'non-existent-id';
      todoService.removeTodo = jest.fn().mockImplementation(() => {
        throw new Error('No se encontró un Todo con el ID: non-existent-id');
      });

      const response = await request(app).delete(`/todos/${nonExistentId}`);

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain('No se encontró un Todo con el ID: non-existent-id');
    });

    test('removeTodo debe eliminar correctamente un Todo existente y responder con un mensaje de éxito', async () => {
      const mockId = 'mock-id-1';

      // Simula que el Todo existe y puede ser eliminado
      todoService.getTodo = jest.fn().mockReturnValue({ id: mockId, title: 'Existente Todo' });
      todoService.removeTodo = jest.fn();

      const response = await request(app).delete(`/todos/${mockId}`);

      expect(response.statusCode).toBe(200);
      expect(response.text).toContain(`Todo eliminado con id: ${mockId}`);
      expect(todoService.removeTodo).toHaveBeenCalledWith(mockId);
    });

    test('removeTodo debe manejar un error desconocido y responder con el código de estado 500', async () => {
      const mockId = 'mock-id-1';

      // Simula un error no estándar (no instancia de Error) en removeTodo
      todoService.removeTodo = jest.fn().mockImplementation(() => {
        throw {}; // Lanza un objeto vacío para simular un error no estándar
      });

      const response = await request(app).delete(`/todos/${mockId}`);

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain('Error desconocido al eliminar el Todo');
    });
  });
});
