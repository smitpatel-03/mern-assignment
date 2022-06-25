const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  verificationToken: String,
  verificationTokenExpire: Date,
});

userSchema.methods.getVerificationToken = function () {
  const verifyEmailToken = crypto.randomBytes(20).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(verifyEmailToken)
    .digest("hex");
  this.verificationTokenExpire = Date.now() + 10 * 60 * 1000;
  return verifyEmailToken;
};

module.exports = mongoose.model("User", userSchema);
