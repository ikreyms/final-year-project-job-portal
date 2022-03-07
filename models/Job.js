const mongoose = require("mongoose");
const Employer = require("./Employer");

const jobSchema = new mongoose.Schema({
  postedBy: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employer",
  },

  title: {
    required: [true, "Please provide the title of the job."],
    type: String,
  },

  postDate: Date,

  dueDate: Date,

  description: String,

  //   "postDate": "2022-02-12T01:12:59",

  //   "dueDate": "2022-02-25T23:59:59"
});

module.exports = new mongoose.model("Job", jobSchema);
