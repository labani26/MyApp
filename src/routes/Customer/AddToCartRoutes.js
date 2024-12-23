const express = require("express");
const addtocartRouter = express.Router();
const { addToCart, getCustomerCarts, removeFromCart } = require("../../controller/Customer/AddToCartController");

addtocartRouter.post("/addToCart", addToCart );

addtocartRouter.get("/getCustomerCart", getCustomerCarts);

addtocartRouter.delete("/removeFromCart/:cartItemId", removeFromCart);

module.exports = addtocartRouter;