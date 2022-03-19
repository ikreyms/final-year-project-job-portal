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
  const { jobCategory, jobType, salaryRange } = req.query;

  let salaryLowerBound;
  let salaryUpperBound;

  if (salaryRange) {
    salaryLowerBound = Number(salaryRange.split("-")[0]);
    salaryUpperBound = Number(salaryRange.split("-")[1]);
  }

  if (salaryRange === "20000+") salaryLowerBound = 20000;

  const searchObject = {
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
    const jobs = await Job.find(searchObject);

    if (!jobs)
      return responseToClient(res, 204, {
        message: "No jobs match this filter.",
      });

    responseToClient(res, 200, { success: true, jobs });
  } catch (error) {
    responseToClient(res, 400, { success: false, error: error.message });
  }
};
