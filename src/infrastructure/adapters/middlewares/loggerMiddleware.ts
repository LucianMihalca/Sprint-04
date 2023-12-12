// Logger middleware for Express

import { Request, Response, NextFunction } from 'express';
import { logger } from '../../services/logger/logger';

/**
 * Middleware de Express para registrar detalles de cada solicitud recibida.
 * Este middleware utiliza el logger para registrar el método HTTP y la ruta de cada solicitud.
 * Es útil para seguimiento, auditoría y depuración, proporcionando una visión clara de las solicitudes que maneja el servidor.
 *
 * @param req - El objeto de solicitud de Express, que proporciona información sobre la solicitud HTTP.
 * @param res - El objeto de respuesta de Express, que se utiliza para enviar la respuesta HTTP.
 * @param next - La función next de Express para pasar el control al siguiente middleware en la cadena.
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Registra el método y la ruta de la solicitud recibida.
  logger.log(`Request: ${req.method} ${req.path}`);

  // Pasa el control al siguiente middleware.
  next();
};
