const express = require("express");
const adminRouter = express.Router();
const { signup, signin } = require("../../controller/Admin/AdminController");

adminRouter.post("/signup",signup);

adminRouter.post("/signin",signin );

module.exports = adminRouter;