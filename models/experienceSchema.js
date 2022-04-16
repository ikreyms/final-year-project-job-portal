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
      required: [true, "Please provide the employer name."],
    },
    jobTitle: {
      type: String,
      required: [true, "Please provide the title of the job."],
    },
    duration: {
      type: Number,
      required: [true, "Please provide the duration of your employment."],
    },
    from: {
      type: Date,
      required: [true, "Provide the employment start year."],
    },
    to: {
      type: Date,
      required: [true, "Provide the employment termination year."],
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
