const express = require("express");
const {
  registration,
  login,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");
const route = express.Router();

route.post("/signup", registration);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);
route.post("/signin", login);

module.exports = route;
