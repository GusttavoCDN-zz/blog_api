const Joi = require('joi');
const throwError = require('../helpers/throwError');

const { Category } = require('../database/models');

class CategoryService {
  static validateCategoryBody(unknown) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error } = schema.validate(unknown);
    return { error } || null;
  }

  static async exists(name) {
    return Category.findOne({ where: { name } });
  }

  static async create(category) {
    const { error } = this.validateCategoryBody(category);
    if (error) return throwError('badRequest', error.message);

    const categoryAlreadyExists = await this.exists(category.name);
    if (categoryAlreadyExists) {
      return throwError('conflict', 'Category already registered');
    }

    await Category.create(category);
    const createdCategory = await Category.findOne({ where: { name: category.name } });
    return createdCategory;
  }

  static async getAll() {
    const users = Category.findAll({ attributes: { exclude: ['password'] } });
    return users;
  }

  static async getOne(id) {
    const user = await Category.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) return throwError('notFound', 'User does not exist');
    return user;
  }
}

module.exports = CategoryService;
