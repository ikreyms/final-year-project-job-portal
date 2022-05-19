const express = require("express");
const {
  getAdminDashboardData,
  getAdminNotifications,
  clearAdminNotifications,
} = require("../controllers/admin");

const router = express.Router();

router.get("/", getAdminDashboardData);
router.get("/notifications", getAdminNotifications);
router.delete("/clearNotifications", clearAdminNotifications);

module.exports = router;
