const express = require("express");
const { registration, login } = require("../controllers/authController");
const route = express.Router();

route.post("/signup", registration);
route.post("/signin", login);

module.exports = route;
