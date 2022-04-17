const Application = require("../models/Application");
const responseToClient = require("../utils/responseToClient");

exports.createApplication = async (req, res, next) => {
  const { seekerId, jobId } = req.params;
  try {
    const exists = await Application.find({ seekerId, jobId }).exec();
    if (exists.length > 0)
      return responseToClient(res, 400, {
        success: false,
        message: "You have already applied for the job.",
      });
    const application = await Application.create({
      seekerId,
      jobId,
    });
    responseToClient(res, 200, {
      success: true,
      application,
      message: "You have applied to the job.",
    });
  } catch (error) {
    responseToClient(res, 500, { success: false, error: error.message });
  }
};

exports.getApplicationsBySeeker = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const applications = await Application.find({ seekerId })
      .populate("seekerId")
      .populate("jobId")
      .sort({ createdAt: -1 });

    if (applications.length === 0)
      return responseToClient(res, 404, {
        success: false,
        message: "You have no job applications.",
      });

    responseToClient(res, 200, { success: true, applications });
  } catch (error) {
    responseToClient(res, 500, { error: error.message });
  }
};
