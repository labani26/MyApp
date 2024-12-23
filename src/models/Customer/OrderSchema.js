const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    orderStatus: {
        type: String,
        require: true
    },
    paymentStatus: {
        type: String,
        require: true
    },
    orderTime: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema )