const Application = require("../models/Application");
const Interview = require("../models/Interview");
const Notification = require("../models/Notification");
const User = require("../models/User");
const responseToClient = require("../utils/responseToClient");
const moment = require("moment");
const Employer = require("../models/Employer");

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

    //increment jobs applied in seeker
    await User.updateOne({ _id: seekerId }, { $inc: { jobsApplied: 1 } });

    //increment total received applications in Employer
    await Employer.updateOne(
      { _id: empId },
      { $inc: { totalReceivedApplications: 1 } }
    );

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
  const { empId, status } = req.params;

  let searchObj = { empId, status };
  if (status === "All") searchObj = { empId };

  try {
    const applications = await Application.find({ ...searchObj })
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
    }).populate([
      { path: "jobId", model: "Job" },
      { path: "empId", model: "Employer" },
    ]);
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

    for (const application of applications) {
      await Notification.create({
        receiver: application.seekerId,
        subject: "Application Rejected",
        body: `Your job application for ${application?.jobId.title} was REJECTED by ${application?.empId.companyName}.`,
        postedBy: empId,
      });
    }

    // increment applicationsRejected in user
    const seekerIds = applications.map((application) => application.seekerId);
    await User.updateMany(
      { _id: { $in: [...seekerIds] } },
      { $inc: { applicationsRejected: 1 } }
    );

    responseToClient(res, 200, {
      success: true,
      message: "Applications rejected.",
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

    await Interview.create({
      empId,
      appIds: [...selectionList],
      venue,
      interviewDate: date,
      interviewTime: time,
    });

    for (const application of applications) {
      await Notification.create({
        receiver: application.seekerId,
        subject: "Application Accepted",
        body: `Your job application for ${
          application?.jobId.title
        } was ACCEPTED by ${
          application?.empId.companyName
        }. Interview is scheduled on ${moment(date).format(
          "DD/MM/YYYY"
        )} hrs | ${moment(time).format(
          "HH:mm"
        )} at ${venue}. Remember to bring the National ID card and original certificates to the interview.`,
        postedBy: empId,
      });
    }

    const seekerIds = applications.map((application) => application.seekerId);
    await User.updateMany(
      { _id: { $in: [...seekerIds] } },
      { $inc: { applicationsAccepted: 1 } }
    );

    // increment total interviews scheduled in employer
    await Employer.updateOne(
      { _id: empId },
      { $inc: { totalInterviewsScheduled: 1 } }
    );

    responseToClient(res, 200, {
      success: true,
      message:
        "Applications accepted. Interview created. Notifications created.",
      applications, //clear later
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
