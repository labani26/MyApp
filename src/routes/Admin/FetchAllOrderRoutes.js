const express = require("express");
const { fetchAllOrder } = require("../../controller/Admin/FetchAllOrderController")
const orderRouter = express.Router();

orderRouter.get("/fetchOrder", fetchAllOrder );

module.exports = orderRouter;