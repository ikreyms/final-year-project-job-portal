const Notification = require("../models/Notification");
const responseToClient = require("../utils/responseToClient");

exports.createNotification = async (req, res, next) => {
  const { seekerId, empId } = req.params;
  const { subject, body } = req.body;
  try {
    const notification = await Notification.create({
      receivers: [seekerId],
      subject,
      body,
      postedBy: empId,
    });
    responseToClient(res, 201, { success: true, notification });
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
    });
    responseToClient(res, 200, { success: true, notifications });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "getNotifications",
      error: error.message,
    });
  }
};
