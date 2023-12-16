/**
 * Clase Logger para registrar mensajes y errores.
 * Proporciona métodos básicos de logging para registrar información y errores en la consola.
 */
class Logger {
  /**
   * Registra un mensaje de log en la consola.
   * Utiliza el método console.log para mostrar mensajes informativos junto con la fecha y hora actuales.
   *
   * @param message El mensaje a registrar.
   */
  log(message: string) {
    console.log(new Date().toISOString(), message);
  }

  /**
   * Registra un mensaje de error en la consola.
   * Utiliza el método console.error para mostrar mensajes de error junto con la fecha y hora actuales.
   * Los mensajes de error se destacan con la etiqueta 'ERROR:' para una fácil identificación.
   *
   * @param message El mensaje de error a registrar.
   */
  error(message: string) {
    console.error(new Date().toISOString(), 'ERROR:', message);
  }
}

// Se exporta una instancia de Logger para ser utilizada en toda la aplicación.
export const logger = new Logger();
