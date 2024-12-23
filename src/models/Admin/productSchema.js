const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        price: {
            type: String,
            require: true
        },
        material: {
            type: String,
            require: true 
        },
        image: {
            type: String,
            require: true 
        },
        country_of_origin: {
            type: String,
            require: true 
        },
        count: {
            type: Number,
            require: true  
        }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Products', ProductSchema);