// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/initiate', authMiddleware, paymentController.initiatePayment);
router.post('/confirm', authMiddleware, paymentController.confirmPayment);

module.exports = router;
