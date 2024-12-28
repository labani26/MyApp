const Cart = require("../../models/Customer/AddToCartSchema"); // Import the Cart model
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const CUSTOMER_SECRET_KEY = "MyApp";


//Helper function to decode JWT and extract customer ID
const getCustomerIdFromToken = (token) => {  //This function, getCustomerIdFromToken, is used to extract the customer ID from a JWT
  try {
    const decode = jwt.verify(token, CUSTOMER_SECRET_KEY); //This line uses the jwt.verify() method from the jsonwebtoken library to decode and verify the JWT.
                                                  //token: This is the JWT passed to the function.
                                                 //CUSTOMER_SECRET_KEY: This is a secret key that the jwt.verify() function uses to verify the authenticity of the token (it should match the key that was used to sign the JWT).
    return decode.id; //It returns the value of decode.id, which represents the customer ID from the decoded JWT.
  } catch(error) {
    return null
  }
};


// Create an order for the logged-in user
const addToCart = async (req, res) => {
    const { productId } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
     
    const customerId = getCustomerIdFromToken(token);
    if(!customerId){
        return res.status(401).json({ message: 'You must be logged in to place an order.'})
    }
    try {
         
        // Validate the input data (optional)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Create a new cart entry
        const newCartItem = new Cart({
            customerId: customerId,
            productId: productId,
            cartStatus: "in-cart",
            cartTime: Date.now(),
        });

        // Save the new cart item to the database
        await newCartItem.save();

        // Send success response
        res.status(201).json({ message: "Product added to cart successfully", cart: newCartItem });

    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


//Get all cart for the logged-in user
const getCustomerCarts = async( req,res ) => {
    const token = req.headers.authorization?.split(" ")[1];
    const customerId = getCustomerIdFromToken(token);

    if(!customerId) {
        return res.status(401).json({ message: 'You must be logged in to view your cart.'});
    }

    try {
        const carts = await Cart.find({ customerId: customerId });
        res.status(200).json(carts);

    } catch (error){
        res.status(500).json({ message: "Failed to retrive cart item", error});
    }
};

//Remove an item from the cart
const removeFromCart = async ( req, res ) => {
    const { cartItemId } = req.params; // Expecting the cart item ID in the URL
    const token = req.headers.authorization?.split(" ")[1];
    const customerId = getCustomerIdFromToken(token);

    if(!customerId) {
        return res.status(401).json({ message: 'You must be logged in to view your cart.'});
    }

    try {
        const result = await Cart.findOneAndDelete({ _id: cartItemId, customerId: customerId });

        if(!result) {
            return res.status(404).json({ message: 'Cart item not found'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to remove item from cart', error })
    }

}

module.exports = { addToCart, getCustomerCarts, removeFromCart };
