const mongoose = require("mongoose");

const responsibilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter responsibility."] },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = responsibilitySchema;
