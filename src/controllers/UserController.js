const httpStatus = require('../helpers/httpStatus');
const UserService = require('../services/UserService');

class UserController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    const token = await UserService.create(req.body);
    return res.status(httpStatus.created).json({ token });
  }

  static async getAll(req, res) {
    const users = await UserService.getAll();
    return res.status(httpStatus.ok).json(users);
  }
}

module.exports = UserController;
