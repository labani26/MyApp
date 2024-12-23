const express = require("express");
const { getAllProduct } = require("../../controller/Customer/GetAllProductController")
const getallproductRouter = express.Router();

getallproductRouter.get("/getAllProduct", getAllProduct);

module.exports = getallproductRouter;