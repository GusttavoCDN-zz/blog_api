const httpStatus = require('../helpers/httpStatus');

/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandlerMiddleware = ({ code, message }, _req, res, _next) => {
  if (code && message) return res.status(httpStatus[code]).json({ message });
  res.status(httpStatus.internalServerError).json({ message: 'Internal Server Error' });
};

module.exports = errorHandlerMiddleware;
