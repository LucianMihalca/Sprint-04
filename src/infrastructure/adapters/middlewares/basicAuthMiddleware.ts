import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para manejar la autenticación básica.
 * Este middleware verifica si la solicitud contiene una cabecera de autenticación básica.
 * Si no se encuentra la cabecera o no sigue el formato esperado para autenticación básica,
 * devuelve un estado HTTP 401 - Unauthorized, indicando que el acceso no está autorizado.
 *
 * @param req - El objeto de solicitud de Express.
 * @param res - El objeto de respuesta de Express.
 * @param next - La función next de Express para pasar el control al siguiente middleware.
 */
export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const envUser = process.env.USER_NAME;
  const envPassword = process.env.PASSWORD;

  if (authHeader && authHeader.startsWith('Basic ')) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');

    if (username === envUser && password === envPassword) {
      next();
      return;
    }
  }

  res.status(401).send('Acceso no autorizado');
};
