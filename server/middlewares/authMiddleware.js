const { verifyToken } = require("../utils/helper");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token.ACCESS_TOKEN)
      return res.status(400).send({ error: "invalid request..!" });

    const decoded = verifyToken(token.ACCESS_TOKEN);
    if (!decoded) return res.status(400).send({ error: "invalid request..!" });
    req.user = decoded;
    console.log(decoded);

    next();
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`authMiddleware: ${error}`);
  }
};

module.exports = { authMiddleware };
