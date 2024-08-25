// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/add', authMiddleware, cartController.addItemToCart);
router.get('/', authMiddleware, cartController.getCart);
router.patch('/update', authMiddleware, cartController.updateCartItem);
router.delete('/remove', authMiddleware, cartController.removeItemFromCart);

module.exports = router;
