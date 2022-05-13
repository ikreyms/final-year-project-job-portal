const Application = require("../models/Application");
const Interview = require("../models/Interview");
const Notification = require("../models/Notification");
const responseToClient = require("../utils/responseToClient");
const moment = require("moment");

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

exports.rejectApplications = async (req, res, next) => {
  const { selectionList } = req.body;
  const { empId } = req.params;
  try {
    const applications = await Application.find({
      _id: { $in: [...selectionList] },
    });
    if (applications.length === 0)
      return responseToClient(res, 404, {
        success: false,
        error: "No applications found",
        selectionList: [...selectionList],
      });

    await Application.updateMany(
      { _id: { $in: [...selectionList] } },
      { status: "Rejected" }
    );

    const newApplications = await Application.find({ empId, status: "Pending" })
      .populate("jobId")
      .populate("seekerId")
      .populate("empId")
      .sort({ createdAt: -1 });

    responseToClient(res, 200, {
      success: true,
      message: "Applications rejected.",
      applications: newApplications,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "rejectApplication",
    });
  }
};

exports.acceptApplications = async (req, res, next) => {
  const { venue, date, time, selectionList } = req.body;
  const { empId } = req.params;
  try {
    const applications = await Application.find({
      _id: { $in: [...selectionList] },
    })
      .populate({ path: "jobId", select: "title" })
      .populate({ path: "empId", select: "companyName" });

    if (applications.length === 0)
      return responseToClient(res, 404, {
        success: false,
        error: "No applications found",
        selectionList: [...selectionList],
      });

    await Application.updateMany(
      { _id: { $in: [...selectionList] } },
      { status: "Accepted" }
    );

    const newApplications = await Application.find({ empId, status: "Pending" })
      .populate("jobId")
      .populate("seekerId")
      .populate("empId")
      .sort({ createdAt: -1 });

    // const x = await Application.aggregate([
    //   { $group: { _id: "$jobId", seekerIds: { $push: { $seekerId } } } },
    // ]);

    // const seekerIds = await Application.find(
    //   { _id: { $in: [...selectionList] } },
    //   "seekerId"
    // );
    // const jobIds = await Application.find(
    //   { _id: { $in: [...selectionList] } },
    //   "jobId"
    // );

    await Interview.create({
      empId,
      appIds: [...selectionList],
      venue,
      interviewDate: date,
      interviewTime: time,
    });

    applications.forEach(async (application) => {
      await Notification.create({
        receivers: [application.seekerId],
        subject: "Application Accepted",
        body: `Your job application for ${
          application?.jobId.title
        } was ACCEPTED by ${
          application?.empId.companyName
        }. Interview is scheduled to ${moment(date).format(
          "DD/MM/YYYY"
        )} | ${moment(time).format("HH:mm")}`,
        postedBy: empId,
      });
    });

    responseToClient(res, 200, {
      success: true,
      message:
        "Applications accepted. Interview created. Notifications created.",
      applications: newApplications,
    });
  } catch (error) {
    let errorMessage = {};

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errorMessage[key] = error.errors[key].message;
      });
      responseToClient(res, 400, {
        success: false,
        error: errorMessage,
        errorFrom: "acceptApplication",
      });
    } else {
      responseToClient(res, 500, {
        success: false,
        error: error.message,
        errorFrom: "acceptApplication",
      });
    }
    // responseToClient(res, 500, {
    //   success: false,
    //   error: error,
    //   errorFrom: "acceptApplication",
    // });
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
