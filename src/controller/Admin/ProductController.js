const Product = require("../../models/Admin/productSchema");

const Products = async(req, res) => {
    const { name, description, category, price, material, image, country_of_origin, count } = req.body

    if( !name || !description || !category || !price || !material || !image || !country_of_origin){
        return res.status(400).json({ message: "All field are required" });
    }

    try{

        const updatedProduct = await Product.findOneAndUpdate(
            { name: name },
            { $inc: { count: count } },  //$inc: This is a MongoDB operator used to increment a field by a specified value. In this case, it is used to increment the count field in the matched document by the value of count provided in the request.

            { new: true } //This means the updatedProduct variable will contain the latest version of the product document, including the incremented count valu
        );
        if(updatedProduct){
            return res.status(200).json({ "message": "Product uploaded"});
        }

        //Add a new Prpduct
        const ProductUpload = new Product ({
            name,
            description, 
            category, 
            price, 
            material, 
            image,
            country_of_origin,
            count

        });

        // Save the Product to the database
        await ProductUpload.save()
        res.status(200).json({ "message": "Product uploaded" })

    } catch (error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { Products };