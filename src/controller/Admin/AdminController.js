const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/Admin/adminSchema");

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "ADMIN_SECRET_KEY";


const signup = async (req,res) => {
    const { name, email, phone, password } = req.body; 


if (!name || !email || !phone || !password ){
    return res.status(400).json({ message : "All fields are  required"});

}
try {
    // Check if user already exists
    const existingUser = await Customer.findOne({ $or: [{ email }, { phone }] });
    if (existingUser){
        return res.status(400).json({ message: "User already exists"});
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password,10)

    //create new password
    const newUser = new Customer({
        name,
        email,
        phone,
        password: hashedPassword
    });

    //save the user to the database
    await newUser.save()

    //generate a jwt token
    const token = jwt.sign(
        {id: newUser._id, email: newUser.email, phone: newUser.phone},ADMIN_SECRET_KEY,
        { expiresIn: "1h" }
    );

    //respond with the created user and token
    res.status(201).json({ message: "User registrered successfully", user: newUser, token });
} catch (error) {
    
    res.status(500).json({ message: "Internal server error"});
    console.log(error);

}
};

// Sign in existing user
const signin = async (req,res) => {
 const {email, phone, password} = req.body;

 if(!email || !phone || !password){
    return res.status(400).json({message: "All field are required"});
 }

 try {
    //check is it exist or not
    const existingUser = await Customer.findOne({ $or: [{email}, {phone}] })

    if(!existingUser){
        return res.status(401).json({message: "User is not exist"})
    }
    // Compare the password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    
    if(!passwordMatch){
        return res.status(401).json({message: "password don't match"});
    }

    //Create a session for the user
    req.session._id = existingUser._id;
    console.log(req.session._id);

    //generate jwt token
    // const token = jwt.sign(
    //     { id: existingUser._id, email: existingUser.email, phone: existingUser.phone }, ADMIN_SECRET_KEY,
    //     { expiresIn: "1h"}
    //     );

        // Send response with user data and token
        return res.status(200).json({message: "Login sucessfull", user: req.session._id });


 } catch(error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error"});
 }

};

module.exports = {signup, signin};


