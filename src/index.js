const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// Initialize express app
const app = express();
const cors = require("cors");
// Middleware to parse incoming JSON payload
const passport = require("passport");
const session = require("express-session");
require('../passportConfig');
// const { body, validationResult } = require('express-validator');




// Route imports
const adminRouter = require("./routes/Admin/AdminRoutes");
const customerRouter = require("./routes/Customer/CustomerRoutes");
const productRouter = require("./routes/Admin/ProductRoutes");
const getAllProductRouter = require("./routes/Customer/GetAllProductRoutes");
const fetchAllOrderRouter = require("./routes/Admin/FetchAllOrderRoutes");
const addToCartRouter = require("./routes/Customer/AddToCartRoutes");
const getProductByIdRouter = require("./routes/Customer/GetProductByIdRoutes");
const getmyorderRouter = require("./routes/Customer/GetMyOrderRoutes");
const orderRouter = require("./routes/Customer/OrderRoutes" );
const cancelorderRouter = require("./routes/Customer/CancelOrder");
 

dotenv.config();


app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'images')));

app.use(cors({
    origin: '*',        //'*' is a wildcard that permits all domains to access your server's resources.
    credentials: true,  //Indicates that the server accepts requests that include credentials such as cookies, HTTP authentication, or client-side SSL certificates.
    methods: ['POST', 'PATCH', 'GET', 'OPTIONS', 'DELETE']
}));
app.use(session({
secret: 'MYAPP_SECRET',
resave: false,            //Prevents the session from being saved back to the store on every request, even if it hasn’t been modified.
saveUninitialized: false,  // An uninitialized session is a session that is created but has no data associated with it.
cookie: {
    sameSite: 'None',         //Allows the session cookie to be sent with cross-origin requests.
                             //Use 'None' only if your app supports cross-origin requests. 
    secure: false,          // false: The cookie can be sent over both HTTP and HTTPS.
    httpOnly: true,         //Restricts the cookie from being accessed by client-side JavaScript
    maxAge: 1000 * 60 * 60 // 1000 * 60 * 60 = 3,600,000 milliseconds (1 hour).  
}
}));


app.use(passport.initialize()); //Sets up Passport for handling authentication processes (e.g., logging in, logging out, and verifying users).
app.use(passport.session());     //Integrates Passport with Express's session middleware to manage persistent login sessions.

//Sets up Passport so it can process authentication requests (e.g., passport.authenticate()).
//Uses the session middleware to store user data between requests.

passport.serializeUser((user, done) => {  //Serialization refers to converting user information into a format that can be stored in the session.
         done(null, user.id);                                 // Passport calls this function when a user successfully authenticates.
});

passport.deserializeUser((id, done) => { //Retrieves the full user object from the database using the user ID stored in the session.
    // Find the user by ID from your database
    Customer.findById(id, (err, user) => { //err: Contains an error if one occurred during the query.
                                           //user: The full user object retrieved from the database, if successful, this will be attached to req.user for the current request.
        done(err, user);
    });

});

// Test route to check if server is running
app.get("/", (req, res) => {
    res.send("Hello world");
});


// MongoDB connection string
const dbURI = "mongodb+srv://admin:admin@learning.zkyd2we.mongodb.net/";

// Setup routes
app.use("/admin", adminRouter);
app.use("/customer", customerRouter);
app.use("/admin", productRouter);
app.use("/customer", getAllProductRouter);
app.use("/admin", fetchAllOrderRouter);
app.use("/customer", addToCartRouter);
app.use("/customer", getProductByIdRouter);  // Corrected route import
app.use("/customer", getmyorderRouter );
app.use("/customer", orderRouter );
app.use("/customer", cancelorderRouter);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // Start the server only after the DB connection is successful
        app.listen(PORT, '0.0.0.0', () => {
            console.log("Server started on port no:" + PORT );
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

