const Interview = require("../models/Interview");
const Notification = require("../models/Notification");
const responseToClient = require("../utils/responseToClient");
const moment = require("moment");

exports.createInterview = async (req, res, next) => {
  const { venue, date, time, selectionList } = req.body;
  const { empId } = req.params;
  try {
    const interview = await Interview.create({
      empId,
      venue,
      date,
      time,
    });
    responseToClient(res, 200, { success: true, interview });
  } catch (error) {
    responseToClient(res, 500, { error: error });
  }
};

exports.getInterviews = async (req, res, next) => {
  const { empId } = req.params;
  try {
    const interviews = await Interview.find({ empId })
      .populate({
        path: "appIds",
        model: "Application",
        populate: [
          { path: "jobId", model: "Job" },
          { path: "seekerId", model: "User" },
        ],
      })
      .sort("interviewDate");
    if (interviews.length === 0)
      return responseToClient(res, 404, {
        success: false,
        message: "No interviews scheduled.",
      });
    responseToClient(res, 200, { success: true, interviews });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "getInterviews",
      error: error.message,
    });
  }
};

exports.cancelInterview = async (req, res, next) => {
  const { interviewId, empId } = req.params;
  try {
    const interview = await Interview.findOne({ _id: interviewId })
      .populate({
        path: "appIds",
        model: "Application",
        populate: [
          { path: "jobId", model: "Job" },
          { path: "empId", model: "Employer" },
        ],
      })
      .populate("empId");

    await Interview.deleteOne({ _id: interviewId });

    const receivers = interview.appIds.map((appId) => appId.seekerId);

    for (const receiver of receivers) {
      await Notification.create({
        receiver: receiver,
        subject: "Interview Cancelled",
        body: `The interview scheduled on ${moment(
          interview.interviewDate
        ).format("DD/MM/YYYY")} | ${moment(interview.interviewTime).format(
          "HH:mm"
        )} hrs was cancelled by ${interview.empId.companyName}`,
        postedBy: empId,
      });
    }

    responseToClient(res, 200, {
      success: true,
      message: "Interview cancelled. Notification created.",
      receivers,
      interview,
    });
  } catch (error) {
    responseToClient(res, 500, {
      errorFrom: "cancelInterview",
      error: error.message,
    });
  }
};

exports.updateInterview = async (req, res, next) => {
  const { interviewId, empId } = req.params;
  const { venue, date, time } = req.body;

  try {
    const interview = await Interview.findOne({ _id: interviewId })
      .populate({
        path: "appIds",
        model: "Application",
        populate: [
          { path: "jobId", model: "Job" },
          { path: "empId", model: "Employer" },
        ],
      })
      .populate("empId");

    if (!interview)
      return responseToClient(res, 404, {
        success: false,
        error: "Interview not found.",
      });

    const prevVenue = interview.venue;
    const prevInterviewDate = interview.interviewDate;
    const prevInterviewTime = interview.interviewTime;

    interview.venue = venue;
    interview.interviewDate = date;
    interview.interviewTime = time;

    await interview.save();

    const receivers = interview.appIds.map((appId) => appId.seekerId);

    for (const receiver of receivers) {
      await Notification.create({
        receiver: receiver,
        subject: "Interview Recheduled",
        body: `The interview scheduled on ${moment(prevInterviewDate).format(
          "DD/MM/YYYY"
        )} | ${moment(prevInterviewTime).format(
          "HH:mm"
        )} hrs at ${prevVenue} has been rescheduled by ${
          interview.empId.companyName
        }. \n
      Recheduled Venue: ${interview.venue}\n
      Recheduled Date: ${moment(interview.interviewDate).format("DD/MM/YYYY")}\n
      Rescheduled Time: ${moment(interview.interviewTime).format("HH:mm")} hrs`,
        postedBy: empId,
      });
    }

    responseToClient(res, 200, {
      success: true,
      message:
        "Interview details updated. Notification send to the interviewees.",
    });
  } catch (error) {
    let errorMessage = {};

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errorMessage[key] = error.errors[key].message;
      });
      responseToClient(res, 400, { success: false, error: errorMessage });
    } else {
      responseToClient(res, 500, {
        success: false,
        error: error.message,
        errorFrom: "updateInterview",
      });
    }
  }
};
