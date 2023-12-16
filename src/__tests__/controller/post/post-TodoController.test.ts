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

    app.post('/todos', (req, res) => todoController.addTodo(req, res));
  });

  describe('POST /todos', () => {
    test('addTodo debe crear un nuevo Todo y responder con el Todo creado', async () => {
      const mockTodo = { id: 'mock-id-1', title: 'Nuevo Todo', isCompleted: false };
      todoService.addTodo = jest.fn().mockReturnValue(mockTodo);

      const response = await request(app).post('/todos').send({ title: 'Nuevo Todo' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockTodo);
      expect(todoService.addTodo).toHaveBeenCalledWith('Nuevo Todo');
    });

    test('addTodo debe manejar errores y responder con el código de estado 500', async () => {
      const errorMessage = 'Error interno del servidor';
      todoService.addTodo = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const response = await request(app).post('/todos').send({ title: 'Todo válido' });

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain(errorMessage);
    });

    test('addTodo debe devolver un Todo con la estructura correcta', async () => {
      const mockTodo = { id: 'mock-id-1', title: 'Nuevo Todo', isCompleted: false };
      todoService.addTodo = jest.fn().mockReturnValue(mockTodo);

      const response = await request(app).post('/todos').send({ title: 'Nuevo Todo' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: 'Nuevo Todo',
          isCompleted: expect.any(Boolean)
        })
      );
    });
    test('addTodo debe manejar solicitudes con datos incompletos', async () => {
      const response = await request(app).post('/todos').send({}); // Enviar cuerpo vacío o sin el campo requerido
      expect(response.statusCode).toBe(400); // Esperar un código de estado 400 (Bad Request)
      // Verifica el mensaje de error específico
    });
    test('addTodo debe manejar un error desconocido y responder con el código de estado 500', async () => {
      // Simula un error no estándar en addTodo
      todoService.addTodo = jest.fn().mockImplementation(() => {
        throw {}; // Lanza un objeto vacío para simular un error no estándar
      });

      const response = await request(app).post('/todos').send({ title: 'Nuevo Todo' });

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain('Error desconocido al añadir el Todo');
    });
  });
});
