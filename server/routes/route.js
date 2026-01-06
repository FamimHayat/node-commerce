const express = require("express");
const route = express.Router();

const authRoute = require("../routes/auth");
const productRoute = require("../routes/product");

route.use("/auth", authRoute);
route.use("/product", productRoute);

module.exports = route;
