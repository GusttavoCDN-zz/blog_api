const httpStatus = require('../helpers/httpStatus');
const AuthService = require('../services/AuthService');

class AuthController {
  /** @type {import('express').RequestHandler} */
  static async login(req, res) {
    const token = await AuthService.createToken(req.body);
    return res.status(httpStatus.ok).json({ token });
  }
}

module.exports = AuthController;
