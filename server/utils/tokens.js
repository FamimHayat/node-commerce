const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateOTP() {
  return Math.floor(10000 + Math.random() * 90000);
}

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },

    process.env.JWT_SEC,
    { expiresIn: "1d" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },

    process.env.JWT_SEC,
    { expiresIn: "15d" }
  );
};

const generateResetPasswordToken = (user) => {
  const resetPassToken = crypto.randomBytes(16).toString("hex");
  const resetHashedToken = crypto
    .createHash("sha256")
    .update(resetPassToken)
    .digest("hex");
  return { resetHashedToken, resetPassToken };
};

const verifyResetPassToken = (token) => {
  const resetPassToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return resetPassToken;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);

    return null;
  }
};

module.exports = {
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  generateResetPasswordToken,
  verifyResetPassToken,
};
