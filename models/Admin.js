const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true],
    },
    password: {
      type: String,
      select: false,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
      lowercase: true,
      unique: true,
    },
    accountType: {
      required: [true, "Select an account type."],
      type: String,
      enum: {
        values: ["Admin"],
        message: "Select an account type.",
      },
      default: "Admin",
    },

    resetPasswordToken: String,

    resetPasswordExpiry: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePasswords = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  return password === this.password;
};

adminSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      accountType: this.accountType,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

adminSchema.methods.setResetPasswordFields = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpiry = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = new mongoose.model("Admin", adminSchema);
