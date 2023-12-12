// TodoRepository.ts
import { Todo } from '../domain/entities/Todo';

export interface TodoRepository {
    getAllTodos(): Todo[];
    addTodo(title: string): Todo;
    updateTodo(id: string): Todo;
    removeTodo(id: string): void;
}
