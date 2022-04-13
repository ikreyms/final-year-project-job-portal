const { default: mongoose } = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      required: [true, "Please provide the name of the educational institute."],
    },
    completedOn: {
      type: Date,
      required: [true, "Please provide the year of completion."],
    },
    level: {
      type: String,
      required: [true, "Please provide the level of course."],
    },
    courseName: {
      type: String,
      required: [true, "Please provide the course name."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = qualificationSchema;
