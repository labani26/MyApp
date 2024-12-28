const express = require("express");
const customerRouter = express.Router();
const { signup, signin } = require('../../controller/Customer/CustomerController');
const { updateUserDetails } = require('../../controller/Customer/UpdateCustomerDetailsController');
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { getCustomerDetails } = require("../../controller/Customer/GetCustomerrDetails");

customerRouter.post("/signup", signup);
 
customerRouter.post("/signin", signin);

customerRouter.patch("/updateUserDetails",isAuthenticated, updateUserDetails);

customerRouter.get("/getCustomerDetails", isAuthenticated, getCustomerDetails);

module.exports = customerRouter;