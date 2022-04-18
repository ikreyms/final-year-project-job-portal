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
    hidden: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = new mongoose.model("Application", applicationSchema);
