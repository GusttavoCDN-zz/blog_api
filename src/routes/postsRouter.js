const { Router } = require('express');
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/search', authMiddleware, PostController.getAllBySearch);
router.delete('/:id', authMiddleware, PostController.delete);
router.put('/:id', authMiddleware, PostController.update);
router.get('/:id', authMiddleware, PostController.getOne);
router.post('/', authMiddleware, PostController.create);
router.get('/', authMiddleware, PostController.getAll);

module.exports = router;
