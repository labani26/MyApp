const mongoose =require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String
        }
    }, {
    timestamps: true
}

)
module.exports = mongoose.model("Customer", CustomerSchema);