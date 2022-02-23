const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name."],
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    match: [
      "^([a-zA-Z0-9_-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$",
      "Please provide a valid email address.",
    ],
    unique: true,
  },
  accountType: {
    type: String,
    enum: ["Job Seeker, Employer, Admin"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Data,
});

module.exports = new mongoose.model("User", userSchema);
