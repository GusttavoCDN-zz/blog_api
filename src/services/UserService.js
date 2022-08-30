const Joi = require('joi');
const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const throwError = require('../helpers/throwError');

const { User, BlogPost, PostCategory } = require('../database/models');
const generateToken = require('../helpers/generateToken');

class UserService {
  static validateUserBody(unknown) {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string().required(),
    });

    const { error } = schema.validate(unknown);
    return { error } || null;
  }

  static async exists(email) {
    return User.findOne({ where: { email } });
  }

  static async create(user) {
    const { error } = this.validateUserBody(user);
    if (error) return throwError('badRequest', error.message);

    const userAlreadyExists = await this.exists(user.email);
    if (userAlreadyExists) {
      return throwError('conflict', 'User already registered');
    }

    const newUser = await User.create(user);
    const token = generateToken(newUser);
    return token;
  }

  static async getAll() {
    const users = User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  }

  static async getOne(id) {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) return throwError('notFound', 'User does not exist');
    return user;
  }

  static async delete(userId) {
    const t = await sequelize.transaction();
    try {
      const posts = await BlogPost.findAll({ where: { userId } });

      await Promise.all(
        posts.map(({ id: postId }) =>
          PostCategory.destroy({ where: { postId } }, { transaction: t })),
      );

      await BlogPost.destroy({ where: { userId } }, { transaction: t });

      await User.destroy({ where: { id: userId } }, { transaction: t });

      await t.commit();
    } catch (error) {
      await t.rollback();
      return throwError('badRequest', error.message);
    }
  }
}

module.exports = UserService;
