const express = require("express");

const {
  createNotification,
  getNotifications,
} = require("../controllers/notifications");

const router = express.Router();

router.post("/:seekerId/:empId/create", createNotification);
router.get("/:seekerId/", getNotifications);

module.exports = router;
