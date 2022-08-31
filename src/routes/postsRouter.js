const { Router } = require('express');
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/search', authMiddleware, PostController.getAllBySearch);
router.get('/:id', authMiddleware, PostController.getOne);
router.get('/', authMiddleware, PostController.getAll);
router.post('/', authMiddleware, PostController.create);
router.put('/:id', authMiddleware, PostController.update);
router.delete('/:id', authMiddleware, PostController.delete);

module.exports = router;
