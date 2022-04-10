const { default: mongoose } = require("mongoose");

const jobCategories = [
  "Agriculture, Food, and Natural Resources",
  "Architecture and Construction",
  "Arts, Audio/Video Technology, and Communication",
  "Business and Finance",
  "Education and Training",
  "Government and Public Administration",
  "Health Science",
  "Information Technology",
  "Law, Corrections, and Security",
  "Marketing",
  "Science, Technology, Engineering, and Math",
];

const experienceSchema = new mongoose.Schema(
  {
    employer: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    category: {
      required: [true, "Please select a job category that matches your job."],
      type: String,
      enum: {
        values: jobCategories,
        message: "Please select a job category that matches your job.",
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = experienceSchema;
