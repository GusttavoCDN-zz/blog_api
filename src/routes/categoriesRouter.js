const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/', authMiddleware, CategoryController.create);
router.get('/', authMiddleware, CategoryController.getAll);

module.exports = router;
