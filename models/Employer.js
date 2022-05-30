const mongoose = require("mongoose");
const User = require("./User");
const Job = require("./Job");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const whyWorkWithUsSchema = require("./whyWorkWithUsSchema");

const employerSchema = new mongoose.Schema(
  {
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
      type: String,
      default: "Employer",
    },

    about: String,

    whyWorkWithUs: [whyWorkWithUsSchema],

    mission: String,

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
    verified: { type: Boolean, default: false },

    contact: String,

    totalRatings: { type: Number, default: 0 },

    ratingsSubmitted: { type: Number, default: 0 },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be minimum 8 characters long."],
      maxlength: [20, "Password cannot be more than 20 characters."],
      match: [
        /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
        "Password must have atleast 1 uppercase letter, 1 special character, and 1 number.",
      ],
      select: false,
    },

    totalReceivedApplications: {
      type: Number,
      default: 0,
    },

    totalJobsPosted: {
      type: Number,
      default: 0,
    },

    totalInterviewsScheduled: {
      type: Number,
      default: 0,
    },

    resetPasswordToken: String,

    resetPasswordExpiry: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

employerSchema.virtual("followers", {
  ref: "User",
  localField: "_id",
  foreignField: "following",
  count: true,
});

employerSchema.virtual("jobsPosted", {
  ref: "Job",
  localField: "_id",
  foreignField: "postedBy",
});

employerSchema.virtual("openings", {
  ref: "Job",
  localField: "_id",
  foreignField: "postedBy",
  count: true,
});

employerSchema.virtual("rating").get(function () {
  if (this.totalRatings === 0 || this.ratingsSubmitted === 0) return 0;
  return this.totalRatings / this.ratingsSubmitted;
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

employerSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

employerSchema.methods.setResetPasswordFields = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpiry = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = new mongoose.model("Employer", employerSchema);
