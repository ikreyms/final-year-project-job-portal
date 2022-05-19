const Application = require("../models/Application");
const Employer = require("../models/Employer");
const Job = require("../models/Job");
const Notification = require("../models/Notification");
const User = require("../models/User");
const responseToClient = require("../utils/responseToClient");

exports.getAdminDashboardData = async (req, res) => {
  try {
    const seekerCount = await User.find().count();
    const employerCount = await Employer.find().count();
    const verifiedEmployerCount = await Employer.find({
      verified: true,
    }).count();
    const jobCount = await Job.find().count();
    const applicationCount = await Application.find().count();

    responseToClient(res, 200, {
      success: true,
      seekerCount,
      employerCount,
      verifiedEmployerCount,
      jobCount,
      applicationCount,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "getAdminDashboardData",
    });
  }
};

exports.getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ adminReceiver: true }).sort(
      "-createdAt"
    );
    responseToClient(res, 200, { success: true, notifications });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "getAdminNotifications",
    });
  }
};

exports.clearAdminNotifications = async (req, res, next) => {
  try {
    const deletedCount = await Notification.deleteMany({
      adminReceiver: true,
    });

    responseToClient(res, 200, {
      success: true,
      message: "Notifications cleared.",
      deletedCount,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "clearAdminNotifications",
      error: error.message,
    });
  }
};
