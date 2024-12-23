const express = require("express");
const searchproductRouter = express.Router();

searchproductRouter.get("/searchProduct", (req,res)=>{
    res.send("searchProduct");
})
module.exports = searchproductRouter;