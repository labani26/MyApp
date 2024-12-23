const mongoose = require("mongoose");

const AddToCartSchema = new mongoose.Schema({

    customerId: {
        type: String,
        require: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    cartStatus: {
        type: String,
        require: true
    },
    cartTime: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Cart", AddToCartSchema);