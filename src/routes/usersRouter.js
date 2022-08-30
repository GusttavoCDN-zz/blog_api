const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.delete('/me', authMiddleware, UserController.delete);
router.get('/:id', authMiddleware, UserController.getOne);
router.post('/', UserController.create);
router.get('/', authMiddleware, UserController.getAll);

module.exports = router;
