const httpStatus = require('../helpers/httpStatus');
const PostService = require('../services/PostService');

class PostController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  static async create(req, res) {
    const { id: userId } = req.user;
    const post = await PostService.create(req.body, userId);
    return res.status(httpStatus.created).json(post);
  }

  static async getAll(_req, res) {
    const posts = await PostService.getAll();
    return res.status(httpStatus.ok).json(posts);
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const post = await PostService.getOne(id);
    return res.status(httpStatus.ok).json(post);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const post = await PostService.update(req.body, userId, id);
    return res.status(httpStatus.ok).json(post);
  }
}

module.exports = PostController;
