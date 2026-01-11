var jwt = require("jsonwebtoken");

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
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },

    process.env.JWT_SEC,
    { expiresIn: "2h" }
  );
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "500 : internal server error..!" });
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
};
