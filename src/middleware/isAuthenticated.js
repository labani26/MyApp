const jwt = require("jsonwebtoken");
const SECRET_KEY = "MyApp"; // Use your secret key

// In-memory blacklist for tokens
const blacklist = new Set();

const isAuthenticated = (req, res, next) => {

    // Extract token from Authorization header, expecting format: "Bearer <token>"
    console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1]; 
    console.log(token);

    if(!token){
        return res.status(401).json({ error: "No token provided, please log in" });
    }

    // Check if the token is blacklisted
    if (blacklist.has(token)){
        return res.status(403).json({ error : "Token is blacklisted. Please log in again." });
    }

    try {
        // Verify token using the secret key (this will also check the signature and expiration)
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach decoded user data to the request object for further use
        req.user = decoded; 

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Handle invalid or expired tokens
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ error: "Token has expired. Please log in again." });
        }
        
        // For any other errors (invalid signature, malformed token, etc.)
        return res.status(403).json({ error: "Invalid token. Please log in again." });
    }
};

// Expose the blacklist for use in the logout function
module.exports = { isAuthenticated, blacklist }; 
