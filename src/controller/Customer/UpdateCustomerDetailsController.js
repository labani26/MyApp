const Customer = require("../../models/Customer/customerSchema");
const jwt = require("jsonwebtoken");
const CUSTOMER_SECRET_KEY = "MyApp";


const updateUserDetails = async (req, res) => {
    //Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; //is used to extract a JWT token from the Authorization header of an incoming HTTP request.
    
    //req.headers.authorization: This accesses the Authorization header from the incoming request. It usually contains the JWT token in the format Bearer <token>.
    //split(" ")[1]: This splits the header by a space and extracts the second part (i.e., the actual token). If the header is not provided or in the wrong format, token will be undefined.

    if(!token){
        return res.status(401).json({ error: "No token found, please login first" })
    }

    try{
        //Verify the token and extract the user ID
        const decode = jwt.verify(token, CUSTOMER_SECRET_KEY);  //This verifies and decodes the JWT token using the SECRET_KEY. If the token is valid, it returns the decoded data.
        const customerId = decode.id; // Get user ID from the token

        //Destructure the address from the request body
        const { address } = req.body;

        if(!address){
            return res.status(400).json({ error: "Address details are required" });
        }

        // Find the user by their ID and update their address
        const customer = await Customer.findOneAndUpdate(
            {_id: customerId },
            { $set: {"address" : address } }, //The $set operator is used to set the value of a field in a document. In this case, it sets the address field in the document to the value of the address variable.
            { new: true } //ensures that the method returns the updated document rather than the original document before the update.
        );

        if(!customer){
            return res.status(404).json({ message: "User not found" });

        }
        //Respond with success
        res.status(200).json({ message: "Address updated successfully", customer});
    } catch(error){
        console.log("Update Error: ", error );
        res.status(500).json({ message: "Internal server error", error});
    }
};
module.exports = { updateUserDetails };


        

    