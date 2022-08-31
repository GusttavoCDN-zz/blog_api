const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.delete('/me', authMiddleware, UserController.delete);
router.get('/:id', authMiddleware, UserController.getOne);
router.get('/', authMiddleware, UserController.getAll);
router.post('/', UserController.create);

module.exports = router;
