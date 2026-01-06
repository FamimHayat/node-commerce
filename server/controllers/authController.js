const { compare } = require("bcrypt");
const users = require("../models/userSchema");

const { sendEmail } = require("../utils/emailSender");
const { generateOTP } = require("../utils/helper");
const isValidEmail = require("../utils/validations");

const registration = async (req, res) => {
  try {
    const { fullName, email, phone, password, address } = req.body;

    if (!email) return res.status(400).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });
    if (!password)
      return res.status(400).send({ error: "password is required..!" });
    const existingUser = await users.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .send({ error: "user already exist. try another account..!" });

    const generateOtp = generateOTP();

    const user = new users({
      fullName,
      email,
      phone,
      password,
      address,
      otp: generateOtp,
      otpExpires: Date.now() + 2 * 60 * 1000,
    });

    sendEmail({ email, subject: "Email Verification..!", otp: generateOtp });

    user.save();
    res.status(201).send({ success: "registration successful..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp) return res.status(400).send({ error: "otp is required..!" });
    if (!email) return res.status(400).send({ error: "invalid request..!" });
    const user = await users.findOne({
      email,
      otp: Number(otp),
      otpExpires: { $gt: new Date() },
      isVerified: false,
    });
    if (!user)
      return res.status(400).send({ error: "invalid or expired otp..!" });
    user.isVerified = true;
    user.otp = null;
    user.save();
    res.status(200).send({ success: "verification successful..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(error);
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).send({ error: "invalid request..!" });

    const user = await users.findOne({
      email,
      isVerified: false,
    });
    if (!user)
      return res.status(400).send({ error: "invalid or expired otp..!" });

    const generateOtp = generateOTP();

    user.otp = generateOtp;
    user.otpExpires = Date.now() + 2 * 60 * 1000;
    user.save();

    sendEmail({ email, subject: "Email Verification..!", otp: generateOtp });

    res.status(201).send({ success: "a new otp has send to your email..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });
    if (!password)
      return res.status(400).send({ error: "password is required..!" });
    const existingUser = await users.findOne({ email });
    if (!existingUser)
      return res.status(400).send({ error: "invalid credentials..!" });

    const matchPassword = await existingUser.comparePassword(password);
    if (!matchPassword)
      return res.status(400).send({ error: "password does not match..!" });

    res.status(200).send({ success: "logged in successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
  }
};

module.exports = { registration, login, verifyOtp, resendOtp };
