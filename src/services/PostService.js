const Sequelize = require('sequelize');
const Joi = require('joi');
const config = require('../database/config/config');
const CategoryService = require('./CategoryService');
const throwError = require('../helpers/throwError');

const sequelize = new Sequelize(config.development);
const { BlogPost, PostCategory } = require('../database/models');

class PostService {
  static validatePostBody(unknown) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number()).required(),
    });

    const { error } = schema.validate(unknown);
    return { error } || null;
  }

  static async validateCategoryIds(categoryIds) {
    const dbCategoriesIds = await CategoryService.getAllCategoriesIds();

    const validatedCategoryIds = categoryIds.filter((id) => dbCategoriesIds.includes(id));

    if (validatedCategoryIds.length > 0) return validatedCategoryIds;
    return throwError('badRequest', '"categoryIds" not found');
  }

  static async createPostTransaction(userId, title, content, categoryIds) {
    const t = await sequelize.transaction();
    try {
      const post = await BlogPost.create({ userId, title, content }, { transaction: t });

      await Promise.all(
        categoryIds.map((id) =>
          PostCategory.create({ postId: post.id, categoryId: id }, { transaction: t })),
      );

      await t.commit();
      return post;
    } catch (error) {
      await t.rollback();
      return throwError('badRequest', error.message);
    }
  }

  static async create({ title, content, categoryIds }, userId) {
    if (!title || !content || !categoryIds) {
      return throwError('badRequest', 'Some required fields are missing');
    }

    const checkedCategoryIds = await this.validateCategoryIds(categoryIds);

    const post = await this.createPostTransaction(userId, title, content, checkedCategoryIds);
    return post;
  }
}

module.exports = PostService;
