const Product = require("../../models/Admin/productSchema");


const getAllProduct = async (req,res) => {
    try {
         // Fetch all products from the database
        const productResult = await Product.find({});

        if (!productResult || productResult.length === 0 ){
            return res.status(404).json({ message: "No products found" });
        }

        // Send a successful response with the products
        res.status(200).json(productResult);

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({error: "Could not load products!"});
    }
};

module.exports = { getAllProduct };



