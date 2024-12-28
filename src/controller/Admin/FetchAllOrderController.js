const Order = require("../../models/Customer/OrderSchema")

const fetchAllOrder = async (req,res) => {

    if (!req.session._id) {
        return res.status(401).json({ message: 'You must be logged in to get all order.' });
    }

    try {
        const result = await Order.find({}, { _v:0 });

        res.send("fetch order successfully",result);
        
    } catch(error){
        console.log(error)
    }
}
module.exports = { fetchAllOrder };