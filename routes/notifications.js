const express = require("express");

const {
  getNotifications,
  markOneNotificationRead,
  markAsRead,
  markAsUnread,
  clearAll,
} = require("../controllers/notifications");

const router = express.Router();

// router.post("/createNotifications/:empId", createNotifications);
router.get("/:seekerId/", getNotifications);
router.patch("/:notificationId/readOne", markOneNotificationRead);
router.patch("/markAsRead", markAsRead);
router.patch("/markAsUnread", markAsUnread);
router.delete("/clearAll/:seekerId", clearAll);

module.exports = router;
