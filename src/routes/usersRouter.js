const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/', UserController.create);
router.get('/', authMiddleware, UserController.getAll);

module.exports = router;
