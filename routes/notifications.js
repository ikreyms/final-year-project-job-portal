const express = require("express");

const {
  createNotifications,
  getNotifications,
} = require("../controllers/notifications");

const router = express.Router();

router.post("/createNotifications/:empId", createNotifications);
router.get("/:seekerId/", getNotifications);

module.exports = router;
