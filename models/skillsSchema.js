const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter skill."] },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = skillsSchema;
