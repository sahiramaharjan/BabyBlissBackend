// controllers/wishlistController.js
const Wishlist = require('../Models/wishlistModels');
const Product = require('../Models/productModels');

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }
        res.json(wishlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (wishlist) {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
                await wishlist.save();
            }
        } else {
            wishlist = new Wishlist({
                user: req.user.id,
                products: [productId]
            });
            await wishlist.save();
        }

        res.json(wishlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const removeFromWishlist = async (req, res) => {
    const { productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            return res.status(404).json({ msg: 'Wishlist not found' });
        }

        const productIndex = wishlist.products.indexOf(productId);
        if (productIndex > -1) {
            wishlist.products.splice(productIndex, 1);
            await wishlist.save();
        } else {
            return res.status(404).json({ msg: 'Product not found in wishlist' });
        }

        res.json(wishlist);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const clearWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (wishlist) {
            wishlist.products = [];
            await wishlist.save();
        }
        res.json({ msg: 'Wishlist cleared' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports ={getWishlist,addToWishlist,removeFromWishlist,clearWishlist}