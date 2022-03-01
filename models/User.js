const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    lowercase: true,
    unique: true,
  },
  accountType: {
    type: String,
    enum: {
      values: ["Job Seeker", "Employer", "Admin"],
      message: "Select an account type.",
    },
    minlength: [4, "Account type is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be minimum 8 characters long."],
    maxlength: [20, "Password cannot be more than 20 characters."],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this._email,
      firstName: this.firstName,
      accountType: this.accountType,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

module.exports = new mongoose.model("User", userSchema);
