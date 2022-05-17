const Application = require("../models/Application");
const Employer = require("../models/Employer");
const Job = require("../models/Job");
const User = require("../models/User");
const responseToClient = require("../utils/responseToClient");

exports.getAdminDashboardData = async (req, res) => {
  try {
    const seekerCount = await User.find().count();
    const employerCount = await Employer.find().count();
    const jobCount = await Job.find().count();
    const applicationCount = await Application.find().count();

    responseToClient(res, 200, {
      success: true,
      seekerCount,
      employerCount,
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
