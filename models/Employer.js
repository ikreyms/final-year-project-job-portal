const mongoose = require("mongoose");
const User = require("./User");
const Job = require("./Job");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employerSchema = new mongoose.Schema({
  image: String,

  companyName: {
    type: String,
    required: [true, "Please provide the company name."],
  },

  sector: {
    required: [true, "Select a sector."],
    type: String,
    enum: {
      values: ["Government", "Private"],
      message: "Sector must be either Government or Private.",
    },
  },

  accountType: {
    required: [true, "Select an account type."],
    type: String,
    enum: {
      values: ["Employer"],
      message: "Select an account type.",
    },
  },

  about: String,

  whyWorkWithUs: String,

  mission: String,

  openings: Number,

  location: String,

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

  contact: String,

  totalRatings: Number,

  ratingsSubmitted: Number,

  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be minimum 8 characters long."],
    maxlength: [20, "Password cannot be more than 20 characters."],
    select: false,
  },

  // rating: Number, // rating in virtuals

  // followers: Number, followers in virtuals

  // jobsPosted: Number, //jobs posted in virtuals
});

employerSchema.virtual("rating").get(function () {
  return (this.totalRatings / this.ratingsSubmitted).toFixed(1);
});

employerSchema.virtual("followers").get(async function () {
  return await User.find({ following: { $in: [this._id] } }).count();
});

employerSchema.virtual("jobsPosted").get(async function () {
  return await Job.find({ postedBy: this._id });
});

employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employerSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      companyName: this.companyName,
      accountType: this.accountType,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

module.exports = new mongoose.model("Employer", employerSchema);
