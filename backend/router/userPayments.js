const express = require("express");
const { isUser } = require("../middleware/middleware");
const { findUser } = require("../controllers/userPayments");
const userPayRouter = express.Router();

userPayRouter.get("/getUser", isUser, findUser);

module.exports = userPayRouter;