// controllers/cartController.js
const Cart = require('../Models/cartModels');
const Product = require('../Models/productModels');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].price = product.price * cart.items[itemIndex].quantity;
            } else {
                cart.items.push({ product: productId, quantity, price: product.price * quantity });
            }
            cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
        } else {
            cart = new Cart({
                user: req.user.id,
                items: [{ product: productId, quantity, price: product.price * quantity }],
                totalPrice: product.price * quantity
            });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].price = product.price * quantity;
            cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
            await cart.save();
            return res.json(cart);
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const removeItemFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (cart) {
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();
        }

        res.json({ msg: 'Cart cleared' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    getCart, addItemToCart,updateCartItem,removeItemFromCart,clearCart
}