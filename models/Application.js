const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  empId: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employer",
  },
  seekerId: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Application", applicationSchema);
