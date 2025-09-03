const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

exports.isUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "Authorization header missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const checkUser = await User.findById(decoded.id);
    if (!checkUser) {
      return res.status(401).json({
        message: "User not found, invalid token",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "JWT validation failed",
      error: error.message,
    });
  }
};
