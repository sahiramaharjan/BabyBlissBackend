// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const authMiddleware = require('../Middlewares/authMiddleware');
const {authorizeRole} = require('../Middlewares/authorizeMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/:orderId', authMiddleware, orderController.getOrderById);
router.get('/user/:userId', authMiddleware, orderController.getAllOrdersForUser);
router.patch('/:orderId/status', authMiddleware, authorizeRole('admin'), orderController.updateOrderStatus);
router.delete('/:orderId', authMiddleware, authorizeRole('admin'), orderController.deleteOrder);

module.exports = router;
