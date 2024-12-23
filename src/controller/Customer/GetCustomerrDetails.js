const Customer = require("../../models/Customer/customerSchema");

const getCustomerDetails = async (req,res) => {
    try {
        // Fetch the customer's ID from the token data (already attached by the middleware)
        const customerId = req.customer.id;

        //Find the customer in the database
        const customer = await Customer.findById(customerId);

        if(!customer){
            return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json({
            id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        });

    } catch (error){
        console.log("Error fetching customer details",error);
        res.status(500).json({ error: "Internal server error"});
    }
};

module.exports = { getCustomerDetails };
