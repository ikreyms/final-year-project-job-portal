const mongoose = require("mongoose");
const criteriaSchema = require("./criteriaSchema");
const responsibilitySchema = require("./responsibilitySchema");

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

const certificateLevels = [
  "Basic Education",
  "O Level",
  "Certificate 1",
  "Certificate 2",
  "Certificate 3",
  "A Level",
  "Diploma",
  "Advanced Diploma",
  "Associates Degree",
  "Bachelors Degree",
  "Masters Degree",
  "PHD",
];

const jobSchema = new mongoose.Schema(
  {
    jobType: {
      required: [true, "Select a job type."],
      type: String,
      enum: {
        values: ["Part-time", "Full-time", "Intern"],
        message:
          "Job type must of the following: Part-time, Full-time, Intern.",
      },
    },

    postedBy: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employer",
    },

    title: {
      required: [true, "Please provide the title of the job."],
      type: String,
    },

    dueDate: {
      required: [true, "Job's due date must be provided."],
      type: Date,
      validate: {
        validator: function (v) {
          return v && v.getTime() > Date.now() + 24 * 60 * 60 * 1000;
        },
      },
    },

    jobCategory: {
      required: [true, "Please select a job category that matches the job."],
      type: String,
      enum: {
        values: jobCategories,
        message: "Please select a job category that matches the job.",
      },
    },

    location: String,

    noOfPositions: { type: Number, default: 1 },

    salary: { type: Number, required: [true, "Salary must be provided."] },

    minQualification: {
      type: String,
      enum: {
        values: certificateLevels,
        message: "Please select a valid certificate level.",
      },
    },

    description: String,

    responsibilities: [responsibilitySchema],

    criteria: [criteriaSchema],

    //   "postDate": "2022-02-12T01:12:59"
  },
  { timestamps: true, timestamps: { createdAt: "postDate" } }
);

// jobSchema.index({ dueDate: 1 }, { expireAfterSeconds: 0 });

module.exports = new mongoose.model("Job", jobSchema);
