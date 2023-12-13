import { IIdGenerator } from '../../../domain/interfaces/IIdGenerator';
import { v4 as uuid4 } from 'uuid';

/**
 * Clase UuidGenerator para la generación de identificadores únicos universales (UUID).
 * Implementa la interfaz IIdGenerator, proporcionando una implementación concreta
 * para generar IDs utilizando la librería uuid.
 */
export class UuidGenerator implements IIdGenerator {
  /**
   * Genera y devuelve un nuevo identificador único (UUID).
   * Utiliza la función v4 de la librería uuid, que genera un UUID aleatorio
   * basado en números aleatorios.
   *
   * @returns Un string que representa un UUID único.
   */
  generate(): string {
    return uuid4();
  }
}
