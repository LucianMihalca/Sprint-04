/**
 * Interfaz para un generador de identificadores (IDs).
 * Esta interfaz define el contrato para las implementaciones
 * que generan identificadores únicos en forma de string..
 */
export interface IIdGenerator {
  /**
   * Genera y devuelve un nuevo identificador único.
   *
   * @returns Un string que representa un identificador único.
   */
  generate(): string;
}
