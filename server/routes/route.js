const express = require("express");
const route = express.Router();

const authRoute = require("../routes/auth");
const productRoute = require("../routes/product");

route.use("/auth", authRoute);
route.use("/auth", productRoute);

module.exports = route;
