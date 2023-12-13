import { TodoRepository } from '../repositories/TodoRepository';
import { Todo } from '../domain/entities/Todo';
import { IIdGenerator } from '../domain/interfaces/IIdGenerator';

// Mapa como estructura de almacenamiento de los objetos Todo, utilizando su ID como clave.
let todosMap = new Map<string, Todo>();

export class TodoService implements TodoRepository {
  private idGenerator: IIdGenerator;
  /**
   * Genera un ID único para cada nuevo Todo usando uuid4.
   * @returns Un string que representa el ID único generado.
   */
  constructor(idGenerator: IIdGenerator) {
    this.idGenerator = idGenerator;
  }
  /**
   * Obtiene y devuelve todas las tareas almacenadas en el mapa como un array.
   * @returns Un array de objetos Todo.
   * Se utiliza Array.from() para convertir el iterador de valores del mapa en un array.
   */
  getAllTodos(): Todo[] {
    return Array.from(todosMap.values());
  }

  /**
   * Busca y devuelve un Todo específico por su ID.
   * Utiliza el método get de Map para la búsqueda eficiente.
   * @param id El ID del Todo a buscar.
   * @returns El objeto Todo encontrado, o undefined si no se encuentra.
   */
  getTodo(id: string): Todo | undefined {
    return todosMap.get(id);
  }

  /**
   * Crea un nuevo Todo, lo agrega al mapa y lo devuelve.
   * Utiliza el método set de Map para agregar el nuevo Todo.
   * @param title El título del nuevo Todo.
   * @returns El objeto Todo recién creado.
   */
  addTodo(title: string): Todo {
    const id = this.idGenerator.generate();
    const newTodo = new Todo(id, title, false);
    todosMap.set(id, newTodo);
    return newTodo;
  }

  /**
   * Encuentra un Todo por su ID y alterna su estado de completitud.
   * Lanza un error si el Todo no se encuentra.
   * @param id El ID del Todo a actualizar.
   * @returns El objeto Todo actualizado.
   */
  updateTodo(id: string): Todo {
    const todo = todosMap.get(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.isCompleted = !todo.isCompleted;
    return todo;
  }

  /**
   * Elimina un Todo del mapa por su ID.
   * Lanza un error si el Todo no se encuentra.
   * @param id El ID del Todo a eliminar.
   */
  removeTodo(id: string): void {
    if (!todosMap.has(id)) {
      throw new Error('Todo not found');
    }
    todosMap.delete(id);
  }
}
