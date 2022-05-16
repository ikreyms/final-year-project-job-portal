const Application = require("../models/Application");
const Notification = require("../models/Notification");
const responseToClient = require("../utils/responseToClient");

exports.createNotifications = async (req, res, next) => {
  //not used
  const { selectionList } = req.body;
  const { empId } = req.params;
  try {
    const rejectedApplications = await Application.find({
      _id: { $in: [...selectionList] },
    })
      .populate({ path: "jobId", select: "title" })
      .populate({ path: "empId", select: "companyName" });

    rejectedApplications.forEach(async (application) => {
      await Notification.create({
        receivers: [application.seekerId],
        subject: "Application Rejected",
        body: `Your job application for ${application?.jobId.title} was rejected by ${application?.empId.companyName}`,
        postedBy: empId,
      });
    });

    responseToClient(res, 201, {
      success: true,
      message: "Notifications created",
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "createNotification",
      error: error.message,
    });
  }
};

exports.getNotifications = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const notifications = await Notification.find({
      reveivers: { $in: [seekerId] },
    })
      .populate({ path: "postedBy", model: "Employer", select: "companyName" })
      .sort("-createdAt")
      .limit(20);

    responseToClient(res, 200, { success: true, notifications });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "getNotifications",
      error: error.message,
    });
  }
};
