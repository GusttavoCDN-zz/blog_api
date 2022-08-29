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

  static async getOne(req, res) {
    const { id } = req.params;
    const user = await UserService.getOne(id);
    return res.status(httpStatus.ok).json(user);
  }
}

module.exports = UserController;
