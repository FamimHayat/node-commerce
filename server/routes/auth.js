const express = require("express");
const {
  registration,
  login,
  verifyOtp,
  resendOtp,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");

const route = express.Router();

route.post("/signup", registration);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);
route.post("/signin", login);
route.post("/forgetpassword", forgetPassword);
route.post("/resetpassword/:token", resetPassword);

module.exports = route;
