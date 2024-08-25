// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/wishlistControllers');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware, wishlistController.addToWishlist);
router.get('/', authMiddleware, wishlistController.getWishlist);
router.delete('/remove', authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
