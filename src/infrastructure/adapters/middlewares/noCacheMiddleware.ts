import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para añadir la cabecera Cache-Control.
 * Este middleware se asegura de que todas las respuestas de la API
 * tengan la cabecera 'Cache-Control' configurada en 'no-cache'.
 * De esta manera, se indica a los clientes que no deben almacenar en caché la respuesta.
 *
 * @param req - El objeto de solicitud de Express.
 * @param res - El objeto de respuesta de Express.
 * @param next - La función next de Express para pasar el control al siguiente middleware.
 */
export const noCacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header('Cache-Control', 'no-cache');
  next();
};
