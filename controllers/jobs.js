const mongoose = require("mongoose");
const Employer = require("../models/Employer");
const Job = require("../models/Job");
const responseToClient = require("../utils/responseToClient");

exports.createJob = async (req, res, next) => {
  const { employerId } = req.params;
  const { jobType, jobCategory, title, description, dueDate, salary } =
    req.body;

  try {
    const exists = await Employer.exists({ _id: employerId });
    if (!exists)
      return responseToClient(res, 400, {
        success: false,
        error: "Invalid employerId.",
      });
  } catch (error) {
    responseToClient(res, 500, { success: false, error: error.message });
  }

  const reqMap = new Map();

  reqMap.set(["jobType", "Job type"], jobType);
  reqMap.set(["title", "Title"], title);
  reqMap.set(["dueDate", "Due date"], dueDate);
  reqMap.set(["salary", "Email"], salary);

  let errorObj = {};

  for (let [key, value] of reqMap.entries()) {
    if (value === "") {
      errorObj[key[0]] = `${key[1]} is required.`;
    }
  }

  if (
    !(Object.keys(errorObj).length === 0 && errorObj.constructor === Object)
  ) {
    return responseToClient(res, 400, {
      success: false,
      error: errorObj,
    });
  }

  try {
    const newJob = await Job.create({
      jobType,
      jobCategory,
      title,
      description,
      dueDate,
      salary,
      postedBy: employerId,
    });
    await Employer.findOneAndUpdate(
      { _id: employerId },
      { $inc: { totalJobsPosted: 1 } }
    );
    responseToClient(res, 201, {
      success: true,
      message: "New job created.",
      newJob,
    });
  } catch (error) {
    let errorMessage = {};

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errorMessage[key] = error.errors[key].message;
      });
      responseToClient(res, 400, { success: false, error: errorMessage });
    } else {
      responseToClient(res, 500, { success: false, error: error.message });
    }
  }
};

exports.filterJobs = async (req, res, next) => {
  const { jobCategory, jobType, salaryRange, empId } = req.query;

  let salaryLowerBound;
  let salaryUpperBound;

  if (salaryRange) {
    salaryLowerBound = Number(salaryRange.split("-")[0]);
    salaryUpperBound = Number(salaryRange.split("-")[1]);
  }

  if (salaryRange === "20000+") salaryLowerBound = 20000;

  const searchObject = {
    ...(empId && { postedBy: empId }),
    ...(jobCategory !== "All" && { jobCategory }),
    ...(jobType !== "All" && { jobType }),
    ...(salaryRange !== "All" && salaryRange !== "20000+"
      ? { salary: { $lte: salaryUpperBound, $gte: salaryLowerBound } }
      : salaryRange !== "All" && salaryRange === "20000+"
      ? { salary: { $gte: salaryLowerBound } }
      : undefined),
  };

  console.log(searchObject);

  try {
    let jobs = await Job.find(searchObject, null, {
      sort: "-postDate",
      populate: { path: "postedBy" },
    }).limit(12);

    if (!jobs)
      return responseToClient(res, 204, {
        message: "No jobs match this filter.",
      });

    responseToClient(res, 200, { success: true, jobs });
  } catch (error) {
    responseToClient(res, 400, { success: false, error: error.message });
  }
};

exports.getOneJob = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const job = await Job.findOne({ _id: id }).populate("postedBy");
      if (!job)
        return responseToClient(res, 400, {
          success: false,
          error: "No job found.",
        });
      return res
        .set("total-doc-count", job.length)
        .status(200)
        .json({ success: true, job });
    } catch (error) {
      return responseToClient(res, 400, {
        success: false,
        error: "No job found.",
      });
    }
  }
  responseToClient(res, 400, {
    success: false,
    error: "No job found.",
  });
};

exports.getSimilarJobs = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findOne({ _id: jobId });
    if (!job)
      return responseToClient(res, 404, {
        success: false,
        message: "Invalid Job Id.",
      });
    const similarJobs = await Job.find({
      jobCategory: job.jobCategory,
      _id: { $nin: [jobId] },
    }).populate("postedBy");
    responseToClient(res, 200, { success: true, similarJobs });
  } catch (error) {
    responseToClient(res, 400, { success: false, error: error.message });
  }
};
