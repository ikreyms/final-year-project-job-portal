const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { responseToClient } = require("../utils/responseToClient");

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
    enum: ["Job Seeker", "Employer", "Admin"],
  },
  password: {
    type: String,
    required: true,
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

module.exports = new mongoose.model("User", userSchema);
