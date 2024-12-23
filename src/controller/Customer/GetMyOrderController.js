const Order = require("../../models/Customer/OrderSchema");

const getMyOrders = async (req, res) => {

    if (!req.session._id){
        return res.status(401).json({ message: 'You must be logged in to view your orders.' });
    }

    try {
        const orders = await Order.find({ customerId: req.session._id });
        res.status(200).json(orders);
    } catch(error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error })
    }
}

module.exports = { getMyOrders };