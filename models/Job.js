const mongoose = require("mongoose");
const Employer = require("./Employer");

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

    description: String,

    dueDate: {
      required: [true, "Job's due date must be provided."],
      type: Date,
    },

    salary: { type: Number, required: [true, "Salary must be provided."] },

    //   "postDate": "2022-02-12T01:12:59"
  },
  { timestamps: true, timestamps: { createdAt: "postDate" } }
);

jobSchema.index({ dueDate: 1 }, { expireAfterSeconds: 0 });

module.exports = new mongoose.model("Job", jobSchema);
