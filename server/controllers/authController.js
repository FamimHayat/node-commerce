const userSchema = require("../models/userSchema");
const { sendEmail } = require("../utils/emailServer");
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
    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .send({ error: "user already exist. try another account..!" });

    const generateOtp = generateOTP();

    const user = new userSchema({
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
    res.status(500).send({ error: "500 : internal server errors..!" });
    console.log(error);
  }
};
const login = async (req, res) => {
  res.status(200).send({ success: "logged in successfully..!" });
};

module.exports = { registration, login };
