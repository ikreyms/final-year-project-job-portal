const Application = require("../models/Application");
const Notification = require("../models/Notification");
const responseToClient = require("../utils/responseToClient");

exports.getNotifications = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const notifications = await Notification.find({ receiver: seekerId })
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

exports.markOneNotificationRead = async (req, res, next) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findOne({ _id: notificationId });
    if (!notification)
      return responseToClient(res, 404, {
        success: false,
        error: "Notification not found.",
      });

    notification.status = "Read";
    await notification.save();
    responseToClient(res, 200, {
      success: true,
      message: "Notification status changed to read.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "markOneNotificationRead",
      error: error.message,
    });
  }
};

exports.markAsRead = async (req, res, next) => {
  const { selectionList } = req.body;
  try {
    await Notification.updateMany(
      {
        _id: { $in: [...selectionList] },
      },
      { status: "Read", lastAttemptedChange: Date.now() }
    );
    responseToClient(res, 200, {
      success: true,
      message: "Notifications mark as read.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "markAsRead",
      error: error.message,
    });
  }
};

exports.markAsUnread = async (req, res, next) => {
  const { selectionList } = req.body;
  try {
    await Notification.updateMany(
      {
        _id: { $in: [...selectionList] },
      },
      { status: "Unread", lastAttemptedChange: Date.now() }
    );
    responseToClient(res, 200, {
      success: true,
      message: "Notifications mark as unread.",
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "markAsUnread",
      error: error.message,
    });
  }
};

exports.clearAll = async (req, res, next) => {
  const { seekerId } = req.params;
  try {
    const deletedCount = await Notification.deleteMany({
      receiver: seekerId,
    });

    responseToClient(res, 200, {
      success: true,
      message: "Notifications cleared.",
      deletedCount,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      errorFrom: "clearAll",
      error: error.message,
    });
  }
};
