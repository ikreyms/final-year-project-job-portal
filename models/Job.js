const mongoose = require("mongoose");
const Employer = require("./Employer");

const jobSchema = new mongoose.Schema(
  {
    postedBy: {
      required: true,
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employer",
    },

    title: {
      required: [true, "Please provide the title of the job."],
      type: String,
    },

    description: String,

    dueDate: { type: Date },

    salary: Number,

    //   "postDate": "2022-02-12T01:12:59"
  },
  { timestamps: true, timestamps: { createdAt: "postDate" } }
);

jobSchema.index({ dueDate: 1 }, { expireAfterSeconds: 0 });

module.exports = new mongoose.model("Job", jobSchema);
