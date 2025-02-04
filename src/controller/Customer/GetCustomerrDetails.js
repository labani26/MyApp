const Customer = require("../../models/Customer/customerSchema");

const getCustomerDetails = async (req,res) => {
    try {
        // Fetch the customer's ID from the token data (already attached by the middleware)
        const customerEmail = req.user.email;
        console.log("details fetched for: " +customerEmail)

        //Find the customer in the database
        const customer = await Customer.findOne({
            "email" : customerEmail
        });

        if(!customer){
            return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json({
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
