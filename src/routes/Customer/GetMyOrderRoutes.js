const express = require("express");
const { getMyOrders } = require("../../controller/Customer/GetMyOrderController");
const getmyorderRouter = express.Router();

getmyorderRouter.get("/getMyOrder", getMyOrders);

module.exports = getmyorderRouter;