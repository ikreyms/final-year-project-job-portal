const Interview = require("../models/Interview");
const responseToClient = require("../utils/responseToClient");

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
    const interviews = await Interview.find({ empId });
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
