const httpStatus = require('../helpers/httpStatus');
const CategoryService = require('../services/CategoryService');

class CategoryController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    const categorie = await CategoryService.create(req.body);
    return res.status(httpStatus.created).json(categorie);
  }

  static async getAll(req, res) {
    const users = await CategoryService.getAll();
    return res.status(httpStatus.ok).json(users);
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const user = await CategoryService.getOne(id);
    return res.status(httpStatus.ok).json(user);
  }
}

module.exports = CategoryController;
