const express = require("express");
const { signup, signin, updateUser, getUser } = require("../controllers/auth");
const { isUser } = require("../middleware/middleware");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin)
authRouter.put("/updateUser", isUser, updateUser)
authRouter.get("/me", isUser, getUser )

module.exports = authRouter