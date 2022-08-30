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
    const categories = Category.findAll();
    return categories;
  }

  static async getAllCategoriesIds() {
    const categories = await Category.findAll({
      attributes: { exclude: ['name'] },
    });

    return categories.map(({ id }) => id);
  }
}

module.exports = CategoryService;
