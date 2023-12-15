import request from 'supertest';
import express, { Express } from 'express';
import { TodoController } from '../../infrastructure/adapters/controller/TodoController';
import { TodoService } from '../../application/TodoService';

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

    // Conectar las rutas con el controlador
    app.get('/todos', (req, res) => todoController.getAllTodos(req, res));
   
  });

  describe('GET /todos', () => {
    test('debe responder con un array de todos', async () => {
      const response = await request(app).get('/todos');
      expect(response.statusCode).toBe(200);
    });

    test('getAllTodos debe manejar errores y responder con el código de estado 500', async () => {
      // Simular un error en TodoService
      todoService.getAllTodos = jest.fn().mockImplementation(() => {
        throw new Error('Error simulado');
      });

      const response = await request(app).get('/todos');

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain('Error simulado'); // Verifica que la respuesta contenga el mensaje de error
    });

    test('debe enviar headers HTTP correctos', async () => {
      const response = await request(app).get('/todos');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('getAllTodos debe retornar un array vacío cuando no hay todos', async () => {
      // Simular que no hay ningún Todo disponible
      todoService.getAllTodos = jest.fn().mockReturnValue([]);

      const response = await request(app).get('/todos');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]); // Verifica que el cuerpo de la respuesta sea un array vacío
    });
    test('getAllTodos debe retornar un array que refleje todos los todos agregados', async () => {
      // Simular algunos Todo agregados
      const mockTodos = [
        { id: 'mock-id-1', title: 'Todo 1', isCompleted: false },
        { id: 'mock-id-2', title: 'Todo 2', isCompleted: true }
        
      ];
      todoService.getAllTodos = jest.fn().mockReturnValue(mockTodos);

      const response = await request(app).get('/todos');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(mockTodos.length);
      expect(response.body).toEqual(mockTodos); // Verifica que el cuerpo de la respuesta sea igual a mockTodos
    });
  });
});
