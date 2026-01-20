const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  registration,
  login,
  verifyOtp,
  resendOtp,
  forgetPassword,
  resetPassword,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/signup", registration);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);
route.post("/signin", login);
route.post("/forgetpassword", forgetPassword);
route.post("/resetpassword/:token", resetPassword);
route.get("/profile", authMiddleware, getProfile);
route.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);

module.exports = route;
