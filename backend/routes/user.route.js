const express = require("express");
const {
  getAllUsers,
  createUser,
  sendVerificationToken,
  checkVerificationToken,
} = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers); // get All users email
userRouter.route("/users/create").post(createUser); // get All users email
userRouter.route("/user/verify").post(sendVerificationToken);
userRouter.route("/user/verify/:token").get(checkVerificationToken);

module.exports = userRouter;
