const { default: mongoose } = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      required: true,
    },
    completedOn: {
      type: Date,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = qualificationSchema;
