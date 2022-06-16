const mongoose = require("mongoose");
const Employer = require("../models/Employer");
const Job = require("../models/Job");
const Notification = require("../models/Notification");
const User = require("../models/User");
const equals = require("../utils/equals");
const responseToClient = require("../utils/responseToClient");
const moment = require("moment");

exports.createJob = async (req, res, next) => {
  const { employerId } = req.params;
  const {
    title,
    jobType,
    noOfPositions,
    location,
    dueDate,
    salary,
    minQualification,
    jobCategory,
    description,
    responsibilities,
    criteria,
  } = req.body;

  try {
    const employer = Employer.findOne({ _id: employerId });
    if (!employer)
      return responseToClient(res, 404, {
        success: false,
        error: "Invalid employer Id.",
      });

    const job = new Job({
      postedBy: employerId,
      title,
      jobType,
      noOfPositions,
      location,
      dueDate,
      salary,
      minQualification,
      jobCategory,
      description,
    });
    !equals(job.responsibilities, responsibilities) &&
      (job.responsibilities = responsibilities);
    !equals(job.criteria, criteria) && (job.criteria = criteria);

    await job.save();

    await Employer.findOneAndUpdate(
      { _id: employerId },
      { $inc: { totalJobsPosted: 1 } }
    );

    //create notification for followers
    const followers = await User.find({ following: { $in: [employerId] } });

    for (const follower of followers) {
      await Notification.create({
        receiver: follower,
        subject: `New Job Posted by ${employer.companyName}`,
        body: `${
          employer.companyName
        } has posted a new job. Job title: ${title} Due date: ${moment(
          dueDate
        ).format("DD/MM/YYYY")}`,
        postedBy: employerId,
      });
    }

    responseToClient(res, 201, {
      success: true,
      job,
      message: "New job created.",
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
  const { jobCategory, jobType, salaryRange, empId, page } = req.query;

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

  // console.log(searchObject);
  let skip = 0;
  let limit = 10;
  if (page) {
    skip = 10 * page - 10;
  }

  try {
    const docCount = await Job.estimatedDocumentCount();

    let jobs = await Job.find(searchObject, null, {
      sort: "-postDate",
      populate: { path: "postedBy" },
    })
      .skip(skip)
      .limit(10);

    if (!jobs)
      return responseToClient(res, 204, {
        message: "No jobs match this filter.",
      });

    responseToClient(res, 200, { success: true, jobs, docCount });
  } catch (error) {
    responseToClient(res, 500, { success: false, error: error.message });
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
      return responseToClient(res, 500, {
        success: false,
        error: error.message,
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
    })
      .populate("postedBy")
      .sort("-postDate");
    responseToClient(res, 200, { success: true, similarJobs });
  } catch (error) {
    responseToClient(res, 500, { success: false, error: error.message });
  }
};

exports.getJobsByEmployer = async (req, res, next) => {
  const { empId } = req.params;
  try {
    const jobs = await Job.find(
      { postedBy: empId, dueDate: { $gt: Date.now() } },
      null,
      {
        sort: "-postDate",
        populate: { path: "postedBy" },
      }
    );
    if (jobs.length === 0)
      return responseToClient(res, 404, {
        success: false,
        message: "No jobs to show.",
      });
    // console.log(jobs);
    responseToClient(res, 200, { success: true, jobs });
  } catch (error) {
    responseToClient(res, 500, { success: false, error: error.message });
  }
};

exports.updateJob = async (req, res, next) => {
  const { jobId } = req.params;
  const {
    title,
    jobType,
    noOfPositions,
    location,
    dueDate,
    salary,
    minQualification,
    jobCategory,
    description,
    responsibilities,
    criteria,
  } = req.body;

  try {
    let job = await Job.findOne({ _id: jobId });

    job.title !== title && (job.title = title);
    job.jobType !== jobType && (job.jobType = jobType);
    job.noOfPositions !== noOfPositions && (job.noOfPositions = noOfPositions);
    job.location !== location && (job.location = location);
    job.dueDate !== dueDate && (job.dueDate = dueDate);
    job.salary !== salary && (job.salary = salary);
    job.minQualification !== minQualification &&
      (job.minQualification = minQualification);
    job.jobCategory !== jobCategory && (job.jobCategory = jobCategory);
    job.description !== description && (job.description = description);

    !equals(job.responsibilities, responsibilities) &&
      (job.responsibilities = responsibilities);
    !equals(job.criteria, criteria) && (job.criteria = criteria);

    await job.save();
    responseToClient(res, 200, { success: true, job });
  } catch (error) {
    let errorMessage = {};
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errorMessage[key] = error.errors[key].message;
      });
      responseToClient(res, 400, { success: false, error: errorMessage });
    } else {
      responseToClient(res, 500, { success: false, error: error.message });
      console.log(error);
    }
  }
};

exports.deleteJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    await Job.deleteOne({ _id: jobId });
    responseToClient(res, 204, {
      success: true,
      message: "Job deleted.",
    });
  } catch (error) {
    responseToClient(res, 500, { error: error.message });
  }
};
