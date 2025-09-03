const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); 
const dbconnect = require("./config/database");
const authRouter = require("./router/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

dbconnect();

app.use("/api/v1/user", authRouter);

app.get("/", (req, res) => {
    res.send("Hi there")
})

app.listen(3000, () => {
    console.log("Server runnning at port 3000");
});
