const { Router } = require('express');
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/', authMiddleware, PostController.create);

module.exports = router;
