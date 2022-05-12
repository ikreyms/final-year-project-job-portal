const { application } = require("express");
const Application = require("../models/Application");
const responseToClient = require("../utils/responseToClient");

exports.createApplication = async (req, res, next) => {
  const { seekerId, jobId, empId } = req.params;
  try {
    const exists = await Application.find({ seekerId, jobId, empId }).exec();
    if (exists.length > 0)
      return responseToClient(res, 400, {
        success: false,
        message: "You have already applied for the job.",
      });
    const application = await Application.create({
      seekerId,
      jobId,
      empId,
    });
    responseToClient(res, 200, {
      success: true,
      application,
      message: "You have applied to the job.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "createApplication",
      success: false,
      error: error.message,
    });
  }
};

exports.getApplicationsBySeeker = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const totalApplications = await Application.find({ seekerId }).count();
    const applications = await Application.find({
      seekerId,
      hidden: false,
    })
      .populate({
        path: "jobId",
        model: "Job",
        select: { dueDate: 1, title: 1, jobType: 1, postDate: 1 },
        populate: {
          path: "postedBy",
          model: "Employer",
          select: { companyName: 1 },
        },
      })
      .sort({ createdAt: -1 });

    if (applications.length === 0)
      return responseToClient(res, 200, {
        success: false,
        message: "You have no job applications.",
        applications: [],
        totalApplications,
      });

    responseToClient(res, 200, {
      success: true,
      applications,
      totalApplications,
    });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "getApplicationsBySeeker",
      error: error.message,
    });
  }
};

exports.hideApplication = async (req, res, next) => {
  const { seekerId, appId } = req.params;
  try {
    const application = await Application.findOne({ seekerId, _id: appId });
    application.hidden = true;
    await application.save();

    const applications = await Application.find({ seekerId, hidden: false })
      .populate({
        path: "jobId",
        model: "Job",
        select: { dueDate: 1, title: 1, jobType: 1, postDate: 1 },
      })
      .populate({
        path: "empId",
        model: "Employer",
        select: { companyName: 1 },
      })
      .sort({ createdAt: -1 });

    responseToClient(res, 200, {
      success: true,
      applications,
      message: "Application hidden.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "hideApplication",
      success: false,
      error: error.message,
    });
  }
};

exports.unhideAllApplications = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const totalApplications = await Application.find({ seekerId }).count();
    const update = await Application.updateMany(
      { seekerId, hidden: true },
      { $set: { hidden: false } }
    );
    const applications = await Application.find({ seekerId, hidden: false })
      .populate({
        path: "jobId",
        model: "Job",
        select: { dueDate: 1, title: 1, jobType: 1, postDate: 1 },
        populate: {
          path: "postedBy",
          model: "Employer",
          select: { companyName: 1 },
        },
      })
      .sort({ createdAt: -1 });

    responseToClient(res, 200, {
      success: true,
      applications,
      totalApplications,
    });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "unhideAllApplications",
      error: error.message,
    });
  }
};

exports.getApplicationsCountBySeeker = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const count = await Application.find({ seekerId }).count();
    responseToClient(res, 200, { success: true, count });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "getApplicationsCountBySeeker",
      error: error.message,
    });
  }
};

exports.getApplicationsReceivedCount = async (req, res, next) => {
  const { empId } = req.params;
  try {
    const count = await Application.find({ empId }).count();
    responseToClient(res, 200, { success: true, count });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "getApplicationsReceivedCount",
      error: error.message,
    });
  }
};

exports.getApplicationsReceived = async (req, res, next) => {
  const { empId } = req.params;
  try {
    const applications = await Application.find({ empId, status: "Pending" })
      .populate("jobId")
      .populate("seekerId")
      .populate("empId")
      .sort({ createdAt: -1 });

    responseToClient(res, 200, { success: true, applications });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "getApplicationsReceived",
      error: error.message,
    });
  }
};

exports.rejectApplication = async (req, res, next) => {
  const { appId } = req.params;
  try {
    const application = await Application.findOne({ _id: appId });
    if (!application)
      return responseToClient(res, 400, {
        success: false,
        error: "Application not found",
      });

    application.status = "Rejected";
    await application.save();

    responseToClient(res, 200, {
      success: true,
      message: "Application rejected.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "rejectApplication",
    });
  }
};

exports.acceptApplication = async (req, res, next) => {
  const { appId } = req.params;
  try {
    const application = await Application.findOne({ _id: appId });
    if (!application)
      return responseToClient(res, 400, {
        success: false,
        error: "Application not found",
      });

    application.status = "Accepted";
    await application.save();

    responseToClient(res, 200, {
      success: true,
      message: "Application accepted.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "acceptApplication",
    });
  }
};

exports.filterApplications = async (req, res, next) => {
  const { seekerId, status } = req.params;

  const searchObj = {
    ...(status === "All" ? { seekerId } : { seekerId, status }),
  };
  try {
    const totalApplications = await Application.find({ seekerId }).count();
    const applications = await Application.find({
      ...searchObj,
    })
      .populate({
        path: "jobId",
        model: "Job",
        select: { dueDate: 1, title: 1, jobType: 1, postDate: 1, postedBy: 1 },
        populate: {
          path: "postedBy",
          model: "Employer",
          select: { companyName: 1 },
        },
      })
      .sort({ createdAt: -1 });

    if (applications.length === 0)
      return responseToClient(res, 200, {
        success: false,
        message: "You have no job applications.",
        applications: [],
        totalApplications,
      });

    responseToClient(res, 200, {
      success: true,
      applications,
      totalApplications,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "filterApplications",
    });
  }
};
