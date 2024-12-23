const Order = require("../../models/Customer/OrderSchema");


// Cancel an order
const cancelOrder = async (req, res) => {
    const { orderId } = req.body;  // Get order ID from request body

    if (!req.session._id) {
        return res.status(401).json({ message: 'You must be logged in to cancel an order.'})
    }

    try {
        // Find the order by ID and ensure it belongs to the logged-in user
        const order = await Order.findOne({ _id: orderId });

        if (!order){
            return res.status(404).json({ message: 'Order not found or you are not authorized to cancel this order.' });
        }
        
        // Check if the order can still be cancelled
        if ( order.orderStatus === 'shipped' || order.orderStatus === 'delivered'){
            return res.status(400).json({message: 'Order cannot be cancelled as it has already been shipped or delivered.'})
        }
        
        // Update the status to cancelled
        order.orderStatus = 'cancelled';
        if(order.paymentStatus == 'paid'){
            order.paymentStatus = 'refund';
        }
        else {
            order.paymentStatus = 'no-refund';
        }

        // Save the updated order to the database
        await order.save();
         
        return res.status(200).json({ message: 'Order cancelled successfully', order})

    } catch (error) {
        console.log("Cancel Order Error",error)
        res.status(500).json({ message: 'Failed to cancel order', error})
    }

};

module.exports = { cancelOrder };