/**
 * Clase `Todo`: Representa una entidad de dominio en el sistema.
 *
 * - Responsabilidades:
 *   1. Define la estructura y características de un "todo" (tarea).
 *   2. Encapsula las propiedades específicas de un "todo" como su 'id', 'title' y 'isCompleted'.
 *
 * - Importante:
 *   Esta clase NO se extiende en `TodoService` por varias razones:
 *   a. Separación de Responsabilidades: `TodoService` maneja la lógica de negocio relacionada con los "todos", mientras que `Todo` es simplemente una representación de la entidad "todo".
 *   b. Principio de Única Responsabilidad: Extender `Todo` en `TodoService` mezclaría la lógica de la entidad (qué es un "todo") con la lógica del servicio (cómo se gestionan los "todos"), violando este principio.
 *   c. Mantenibilidad y Claridad: Mantener `Todo` y `TodoService` separados facilita la comprensión del código, su mantenimiento y permite cambios futuros con menos impacto en otras partes del sistema.
 */
export class Todo {
  id: string;
  title: string;
  isCompleted: boolean;

  constructor(id: string, title: string, isCompleted: boolean = false) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
  }
}
