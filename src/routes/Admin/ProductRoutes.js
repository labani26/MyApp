const express = require("express");
const { Products } = require("../../controller/Admin/ProductController");
const productRouter = express.Router();

productRouter.post("/addProduct", Products );

module.exports = productRouter;