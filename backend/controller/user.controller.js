const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");

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
  )}/user/verify/${verificationToken}`;

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
