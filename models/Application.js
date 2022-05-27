const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
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
    empId: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employer",
    },
    status: {
      default: "Pending",
      type: String,
      enum: {
        values: ["Pending", "Rejected", "Accepted"],
        message: "Select application status: Pending, Rejected, or Accepted.",
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = new mongoose.model("Application", applicationSchema);
