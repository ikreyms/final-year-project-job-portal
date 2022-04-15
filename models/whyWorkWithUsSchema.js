const mongoose = require("mongoose");

const whyWorkWithUsSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Please enter benefit heading."],
    },
    body: {
      type: String,
      required: [true, "Please enter details about the benefit."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = whyWorkWithUsSchema;
