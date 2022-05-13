const express = require("express");

const { createInterview, getInterviews } = require("../controllers/interviews");

const router = express.Router();

router.get("/:empId", getInterviews);
router.post("/createInterview/:empId", createInterview);

module.exports = router;
