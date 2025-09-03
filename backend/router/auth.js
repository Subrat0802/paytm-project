const express = require("express");
const { signup, signin, updateUser } = require("../controllers/auth");
const { isUser } = require("../middleware/middleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin)
authRouter.put("/updateUser", isUser, updateUser)

module.exports = authRouter