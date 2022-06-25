const express = require("express");
const userRouter = require("./routes/user.route");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", userRouter);
module.exports = app;
