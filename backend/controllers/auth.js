const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(404).json({
        message: "All fields are required",
      });
    }

    const checkUser = await user.findOne({ email: email });

    if (checkUser) {
      return res.status(404).json({
        message: "User already signup, please signin.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await user.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    if (!createUser) {
      return res.status(409).json({
        message: "Error while signup",
      });
    }

    res.status(200).json({
      message: "User signed up successfully",
      data: createUser,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Server error while signup",
      data: error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }
    const userSignin = await user.findOne({ email: email });
    if (!userSignin) {
      return res.status(404).json({
        message: "Invalid user, please signup first",
      });
    }
    const checkPassword = await bcrypt.compare(password, userSignin.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: userSignin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    userSignin.password = undefined;

    return res.status(200).json({
      message: "User signin successfully",
      data: userSignin,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error please try again",
      error: error,
    });
  }
};
