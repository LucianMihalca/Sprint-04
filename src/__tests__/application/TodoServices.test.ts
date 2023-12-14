import { TodoService } from '../../application/TodoService';
import { todosMap } from '../../application/TodoService';

// Mock para IIdGenerator
let mockIdGenerator = {
  generate: jest.fn(() => `mock-id-${Math.random()}`)
};
describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    // Reiniciar el Map antes de cada prueba
    todosMap.clear();
    todoService = new TodoService(mockIdGenerator);
  });
  // Pruebas para getAllTodos
  test('getAllTodos debe retornar un array vacío inicialmente', () => {
    expect(todoService.getAllTodos()).toEqual([]);
  });
  test('getAllTodos debe retornar un array con múltiples todos', () => {
    // Agregar múltiples tareas usando todoService
    todoService.addTodo('Todo 1');
    todoService.addTodo('Todo 2');
    todoService.addTodo('Todo 3');

    // Obtener todas las tareas
    const allTodos = todoService.getAllTodos();

    // Verificar si todas las tareas agregadas están presentes
    expect(allTodos.length).toBe(3);
  });
});
