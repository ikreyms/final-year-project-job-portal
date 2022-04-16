const mongoose = require("mongoose");

const criteriaSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter criterion."] },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = criteriaSchema;
