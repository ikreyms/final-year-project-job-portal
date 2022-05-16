const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    empId: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employer",
    },
    appIds: {
      required: true,
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Application",
    },
    // seekerIds: {
    //   required: true,
    //   type: [mongoose.SchemaTypes.ObjectId],
    //   ref: "User",
    // },
    // jobIds: {
    //   required: true,
    //   type: [mongoose.SchemaTypes.ObjectId],
    //   ref: "Job",
    // },
    venue: {
      required: [true, "Please enter the venue."],
      type: String,
    },
    interviewDate: {
      required: [true, "Please enter the interview date."],
      type: Date,
    },
    interviewTime: {
      required: [true, "Please enter the interview time in 24Hrs format."],
      type: Date,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

interviewSchema.index({ interviewDate: 1 }, { expireAfterSeconds: 0 });

module.exports = new mongoose.model("Interview", interviewSchema);
