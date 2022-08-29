const throwError = require('../helpers/throwError');
const validateToken = require('../helpers/validateToken');
const httpStatus = require('../helpers/httpStatus');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return throwError('unauthorized', 'Token not found');
  try {
    const user = validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    const message = 'Expired or invalid token';
    return res.status(httpStatus.unauthorized).json({ message });
  }
};

module.exports = authMiddleware;
