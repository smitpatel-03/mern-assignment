const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const catchAsyncError = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const emails = await User.find();

  if (!emails) {
    return next(new ErrorHandler("No User Found", 400));
  }
  res.status(200).json({
    success: true,
    emails,
  });
});

exports.createUser = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.create({
    email,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

exports.sendVerificationToken = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("No User Found", 400));
  }
  const verificationToken = user.getVerificationToken();

  await user.save({ validateBeforeSave: false });

  // const verifyEmailUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/user/verify/${verificationToken}`;
  console.log(verificationToken);
  const verifyEmailUrl = `${req.protocol}://localhost:3000/user/verify/${verificationToken}`;

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
    });
  }
});

exports.checkVerificationToken = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
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

  console.log(user);

  if (!user) {
    return next(new ErrorHandler("No User Found", 400));
  }
  user.isVerified = true;
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .json({ message: "User is Verfied Successfully", success: true });
});
