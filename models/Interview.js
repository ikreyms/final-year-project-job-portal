const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    empId: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employer",
    },
    seekerId: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    jobId: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Job",
    },
    venue: {
      required: [true, "Please enter the venue."],
      type: String,
    },
    interviewDate: {
      required: [type, "Please enter the interview date."],
      type: Date,
    },
    interviewTime: {
      required: [type, "Please enter the interview time in 24Hrs format."],
      type: Date,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = new mongoose.model("Application", interviewSchema);
