const express = require("express");
const { cancelOrder } = require("../../controller/Customer/CancelOrderController");
const cancelorderRouter = express.Router();

cancelorderRouter.patch("/cancelOrder", cancelOrder);

module.exports = cancelorderRouter;