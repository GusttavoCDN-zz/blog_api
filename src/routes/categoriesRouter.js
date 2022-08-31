const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', authMiddleware, CategoryController.getAll);
router.post('/', authMiddleware, CategoryController.create);

module.exports = router;
