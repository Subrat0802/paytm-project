const express = require("express");
const { isUser } = require("../middleware/middleware");
const { findUser, pay } = require("../controllers/userPayments");
const userPayRouter = express.Router();

userPayRouter.get("/getUser", isUser, findUser);
userPayRouter.post("/pay", isUser, pay)

module.exports = userPayRouter;