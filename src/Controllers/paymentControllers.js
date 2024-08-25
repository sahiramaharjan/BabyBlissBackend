// controllers/paymentController.js
const Payment = require('../Models/paymentModel');
const Order = require('../Models/orderModels');

exports.createPayment = async (req, res) => {
    const { orderId, paymentMethod } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        const payment = new Payment({
            order: orderId,
            user: req.user.id,
            amount: order.totalAmount,
            paymentMethod,
            paymentStatus: 'completed',
            transactionId: generateTransactionId()  // Replace with actual transaction ID generator
        });

        await payment.save();
        res.json(payment);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId).populate('order user');
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json(payment);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getPaymentsForUser = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user.id }).populate('order');
        res.json(payments);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

function generateTransactionId() {
    // Function to generate a unique transaction ID
    return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}
