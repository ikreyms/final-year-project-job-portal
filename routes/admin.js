const express = require("express");
const { getAdminDashboardData } = require("../controllers/admin");

const router = express.Router();

router.get("/", getAdminDashboardData);

module.exports = router;
