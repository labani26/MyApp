const Product = require("../../models/Admin/productSchema");

const getProductById = async (req, res) =>{
    const { productId } = req.params; // Get productId from the route parameters

    try {
        const product = await Product.findById(productId); // Find product by ID
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);  // Send the product details back to the client

    } catch (error){
        res.status(500).json({ message: "Error fetching product details", error });
    }
}

module.exports = { getProductById };