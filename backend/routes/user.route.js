const express = require("express");
const {
  getAllUsers,
  createUser,
  sendVerificationToken,
  checkVerificationToken,
} = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers); // get All users email
userRouter.route("/users/create").post(createUser); // create user
userRouter.route("/user/verify").post(sendVerificationToken); // send verification token
userRouter.route("/user/verify/email/:token").get(checkVerificationToken); // check the token is valid or not

module.exports = userRouter;
