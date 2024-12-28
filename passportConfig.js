const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;     //Imports the local strategy for Passport, used for username/password authentication.                                                              
const bcrypt = require('bcrypt');   //Imports the bcrypt library for securely hashing and comparing passwords.
const Customer = require("./src/models/Customer/customerSchema");

// Local Strategy for login
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {   //Registers the local strategy with Passport.
                                                                                                                            //Specifies how user authentication should be performed using an email and password.
    try {
        // Check if user exists
        const existingUser = await Customer.findOne({ email });

        if (!existingUser) {
            return done(null, false, { message: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, existingUser);
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user._id); // passport.serializeUser(): This method determines which data of the user object should be stored in the session. Here, the user's _id is stored, which is used to identify the user in future requests.
});                       // The done callback is called with no error (null) and the user's _id, which will be stored in the session.

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {   // passport.deserializeUser(): This method is called when a request is made. It retrieves the user from the database using the stored _id. The user is then attached to the request object for later use in the application (for example, accessing the user details in route handlers).
    try {
        const user = await Customer.findById(id);
        done(null, user); //The done callback is called with no error (null) and the retrieved user object.
    } catch (error) {
        done(error, null);  //If an error occurs during the process, the done callback is called with the error.
    }
});
