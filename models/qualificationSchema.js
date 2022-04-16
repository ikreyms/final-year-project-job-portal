const { default: mongoose } = require("mongoose");

const certificateLevels = [
  "",
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
      enum: {
        values: certificateLevels,
        message: "Please select certificate level of the course.",
      },
    },
    courseName: {
      type: String,
      required: [true, "Please provide the course name."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = qualificationSchema;
