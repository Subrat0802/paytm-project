const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

exports.isUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if(!token){
      return res.status(403).json({
        message:"Token is missing",
        success:false
      })
    }

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

    req.userId = checkUser._id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "JWT validation failed",
      error: error.message,
    });
  }
};
