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
    app.put('/todos/:id', (req, res) => todoController.updateTodo(req, res));
  });

  describe('PUT /todos', () => {
    test('updateTodo debe actualizar un Todo existente y responder con el Todo actualizado', async () => {
      const mockTodo = { id: 'mock-id-1', title: 'Actualizado Todo', isCompleted: true };
      todoService.getTodo = jest.fn().mockReturnValue(mockTodo);
      todoService.updateTodo = jest.fn().mockReturnValue(mockTodo);

      const response = await request(app).put('/todos/mock-id-1').send({ title: 'Actualizado Todo', isCompleted: true });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockTodo);
    });
    test('updateTodo debe responder con un código de estado 404 si el Todo no existe', async () => {
      todoService.getTodo = jest.fn().mockReturnValue(null);

      const response = await request(app).put('/todos/non-existent-id').send({ title: 'Inexistente Todo', isCompleted: true });

      expect(response.statusCode).toBe(404);
      expect(response.text).toContain('Todo no encontrado');
    });

    test('updateTodo debe manejar errores y responder con el código de estado 500', async () => {
      const errorMessage = 'Error al actualizar Todo';
      todoService.getTodo = jest.fn().mockReturnValue({ id: 'mock-id-1', title: 'Existente Todo' });
      todoService.updateTodo = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const response = await request(app).put('/todos/mock-id-1').send({ title: 'Actualizado Todo', isCompleted: true });

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain(errorMessage);
    });
    test('updateTodo debe manejar un error desconocido y responder con el código de estado 500', async () => {
      const mockId = 'mock-id-1';

      // Simula que getTodo devuelve un Todo para evitar el error 'Todo no encontrado'
      todoService.getTodo = jest.fn().mockReturnValue({ id: mockId, title: 'Existente Todo', isCompleted: false });

      // Simula un error no estándar en updateTodo
      todoService.updateTodo = jest.fn().mockImplementation(() => {
        throw {}; // Lanza un objeto vacío para simular un error no estándar
      });

      const response = await request(app).put(`/todos/${mockId}`).send({ title: 'Actualizado Todo', isCompleted: true });

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain('Error desconocido al actualizar el Todo');
    });
  });
});
