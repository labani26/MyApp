const express = require("express");
const { isAuthenticated } = require("../../middleware/isAuthenticated");
const { createOrder, getCustomerOrders } = require("../../controller/Customer/OrderController");
const orderRouter = express.Router();

orderRouter.get("/getCustomerOrder", isAuthenticated, getCustomerOrders);

orderRouter.post("/createOrder", isAuthenticated, createOrder);


module.exports = orderRouter;