const users = require("../models/userSchema");

const { sendEmail } = require("../utils/emailSender");
const {
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordToken,
} = require("../utils/helper");
const {
  emailVerificationTemplate,
  forgotPasswordTemplate,
} = require("../utils/templates");
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

    sendEmail({
      email,
      subject: "Email Verification..!",
      otp: generateOtp,
      html: emailVerificationTemplate({
        brandName: "69e-commerce",
        otp: generateOtp,
      }),
    });

    user.save();
    res.status(201).send({ success: "registration successful..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`registrationController: ${error}`);
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
    console.log(`verifyOtp: ${error}`);
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

    sendEmail({
      email,
      subject: "Email Verification..!",
      otp: generateOtp,
      html: emailVerificationTemplate({
        otp,
        brandName: "69e-commerce",
      }),
    });

    res.status(201).send({ success: "a new otp has send to your email..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`resendOtp: ${error}`);
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

    if (!existingUser.isVerified)
      return res.status(400).send({ error: "please verify your email..!" });

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    res.cookie("ACCESS_TOKEN", accessToken, {
      maxAge: 3600000,
      httpOnly: false,
      secure: false,
      // sameSite: "None",
    });
    res.cookie("REFRESH_TOKEN", refreshToken, {
      maxAge: 1296000000,
      httpOnly: false,
      secure: false,
      // sameSite: "None",
    });

    res.status(200).send({ success: "logged in successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`loginController: ${error}`);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).send({ error: "email is required..!" });
    if (!isValidEmail(email))
      return res.status(400).send({ error: "enter a valid email..!" });

    const existingUser = await users.findOne({ email });
    if (!existingUser)
      return res.status(400).send({ error: "email is not verified yet..!" });
    const resetPassToken = generateResetPasswordToken(existingUser);
    const resetPasswordLink = `${
      process.env.CLIENT_URL || "http://localhost:6969"
    }/resetpass/?sec=${resetPassToken}`;

    sendEmail({
      email,
      subject: "reset password..!",
      links: resetPasswordLink,
      html: forgotPasswordTemplate({
        brandName: "69e-commerce",
      }),
    });

    res.status(200).send({ error: "email send successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`forgetPassController: from authcontroller ${error}`);
  }
};

module.exports = { registration, login, verifyOtp, resendOtp, forgetPassword };
