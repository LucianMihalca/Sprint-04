import { TodoService } from '../../application/TodoService';
import { todosMap } from '../../application/TodoService';
import { Todo } from '../../domain/entities/Todo';

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
  test('getAllTodos debe retornar un array vacío cuando no hay todos', () => {
    expect(todoService.getAllTodos()).toEqual([]);
  });
  test('getAllTodos debe retornar un array que refleje todos los todos agregados', () => {
    // Agregar múltiples tareas usando todoService
    todoService.addTodo('Todo 1');
    todoService.addTodo('Todo 2');
    todoService.addTodo('Todo 3');

    // Obtener todas las tareas
    const allTodos = todoService.getAllTodos();

    // Verificar si todas las tareas agregadas están presentes
    expect(allTodos.length).toBe(3);
  });
  test('getAllTodos debe devolver objetos Todo con datos exactos y consistentes', () => {
    const todo1 = todoService.addTodo('Todo 1');
    const allTodos = todoService.getAllTodos();
    expect(allTodos[0]).toEqual(todo1);
  });
  test('Modificar el array devuelto por getAllTodos no debe afectar a todosMap', () => {
    todoService.addTodo('Todo 1');
    const allTodos = todoService.getAllTodos();
    allTodos.push(new Todo('fake-id', 'Fake Todo', false));
    expect(todosMap.size).toBe(1); // Asegurarse de que el mapa original no ha sido modificado
  });

  // Pruebas para getTodo
  test('getTodo debe devolver el Todo correcto para un ID válido', () => {
    const newTodo = todoService.addTodo('Todo 1');
    const retrievedTodo = todoService.getTodo(newTodo.id);

    expect(retrievedTodo).toBeDefined();
    expect(retrievedTodo).toEqual(newTodo);
  });

  test('getTodo debe lanzar un error si el Todo con el ID dado no existe', () => {
    const nonExistentId = 'non-existent-id';
    expect(() => {
      todoService.getTodo(nonExistentId);
    }).toThrow(`No se encontró un Todo con el ID: ${nonExistentId}`);
  });

  // Pruebas para addTodo

  test('addTodo debe agregar un nuevo Todo y devolverlo', () => {
    const title = 'New Todo';
    const newTodo = todoService.addTodo(title);

    expect(newTodo).toHaveProperty('id');
    expect(newTodo.title).toBe(title);
    expect(newTodo.isCompleted).toBe(false);
    expect(todosMap.has(newTodo.id)).toBe(true);
    expect(todosMap.get(newTodo.id)).toEqual(newTodo);
  });

  test('Cada Todo agregado debe tener un ID único', () => {
    const todo1 = todoService.addTodo('Todo 1');
    const todo2 = todoService.addTodo('Todo 2');

    expect(todo1.id).not.toBe(todo2.id);
  });

  test('El Todo agregado debe tener la estructura correcta', () => {
    const title = 'New Todo';
    const newTodo = todoService.addTodo(title);
    expect(newTodo).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: title,
        isCompleted: false
      })
    );
  });
  test('addTodo debe lanzar un error si el título es vacío o nulo', () => {
    expect(() => {
      todoService.addTodo('');
    }).toThrow('El título del Todo no puede estar vacío.');

    expect(() => {
      todoService.addTodo('');
    }).toThrow('El título del Todo no puede estar vacío.');
  });

  // Pruebas para updateTodo

  test('updateTodo debe devolver el mismo Todo con el estado isCompleted actualizado', () => {
    const newTodo = todoService.addTodo('Todo 1');
    const originalState = newTodo.isCompleted;
    const updatedTodo = todoService.updateTodo(newTodo.id);

    expect(updatedTodo.id).toBe(newTodo.id);
    expect(updatedTodo.title).toBe(newTodo.title);
    expect(updatedTodo.isCompleted).toBe(!originalState);
  });

  test('updateTodo debe cambiar el estado de isCompleted de un Todo', () => {
    const newTodo = todoService.addTodo('Todo 1');
    const originalState = newTodo.isCompleted;
    const updatedTodo = todoService.updateTodo(newTodo.id);

    expect(updatedTodo.isCompleted).not.toBe(originalState);
  });

  test('updateTodo debe lanzar un error si el Todo con el ID dado no existe', () => {
    const nonExistentId = 'non-existent-id';
    expect(() => {
      todoService.updateTodo(nonExistentId);
    }).toThrow('Todo not found');
  });

  // Pruebas para removeTodo
  
  test('removeTodo debe eliminar correctamente un Todo existente', () => {
    const newTodo = todoService.addTodo('Todo 1');
    expect(todosMap.has(newTodo.id)).toBe(true); // Verificar que el Todo está en el Map

    todoService.removeTodo(newTodo.id);
    expect(todosMap.has(newTodo.id)).toBe(false); // Verificar que el Todo ha sido eliminado
  });

  test('removeTodo debe lanzar un error si el Todo con el ID dado no existe', () => {
    const nonExistentId = 'non-existent-id';
    expect(() => {
      todoService.removeTodo(nonExistentId);
    }).toThrow('Todo not found');
  });
});
