const express = require("express");
const { getProductById } = require("../../controller/Customer/GetProductById");
const getproductbyidRouter = express.Router();

getproductbyidRouter.get("/getProductById", getProductById);

module.exports = getproductbyidRouter;