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
    app.post('/todos', (req, res) => todoController.addTodo(req, res));
    app.put('/todos/:id', (req, res) => todoController.updateTodo(req, res));
    app.delete('/todos/:id', (req, res) => todoController.removeTodo(req, res));
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
    test('getAllTodos debe manejar un error desconocido y responder con el código de estado 500', async () => {
      // Simula un error no estándar en getAllTodos
      todoService.getAllTodos = jest.fn().mockImplementation(() => {
        throw {}; // Lanza un objeto vacío para simular un error no estándar
      });

      const response = await request(app).get('/todos');

      expect(response.statusCode).toBe(500);
      expect(response.text).toContain('Error desconocido al obtener todos los Todos');
    });
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
