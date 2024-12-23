const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
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
            type: String,
            require: false
        }
    }, {
    timestamps: true
}

)
module.exports = mongoose.model("Admin", AdminSchema);