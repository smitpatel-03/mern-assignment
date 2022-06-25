const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
exports.getAllUsers = async (req, res, next) => {
  const emails = await User.find();

  if (!emails) {
    res.json({ message: "No emails found" });
  }
  res.status(200).json({
    success: true,
    emails,
  });
};

exports.createUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.create({
    email,
  });
  res.status(200).json({
    success: true,
    user,
  });
};

exports.sendVerificationToken = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({ error: "no User Found" });
  }
  const verificationToken = user.getVerificationToken();

  await user.save({ validateBeforeSave: false });

  const verifyEmailUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/verify/${verificationToken}`;

  const message = `Verify you email : - ${verifyEmailUrl}`;

  try {
    await sendEmail({
      email,
      subject: "Verification of your email",
      message,
    });
    res.json({
      success: true,
      message: `email sent to ${email} successfully`,
    });
  } catch (e) {
    console.log("Error");
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.json({
      success: false,
      e,
    });
  }
};

exports.checkVerificationToken = async (req, res, next) => {
  const { token } = req.params;
  const verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    verificationToken,
    verificationTokenExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    res
      .status(404)
      .json({
        message: "Token is Invalid or Expire Try Again",
        success: false,
      });
  }
  res
    .status(200)
    .json({ message: "User is Verfied Successfully", success: true });
};
