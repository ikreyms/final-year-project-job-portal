const express = require("express");

const {
  createInterview,
  getInterviews,
  cancelInterview,
  updateInterview,
} = require("../controllers/interviews");

const router = express.Router();

router.get("/:empId", getInterviews);
router.post("/createInterview/:empId", createInterview);
router.delete("/cancelInterview/:empId/:interviewId", cancelInterview);
router.patch("/:interviewId/:empId/updateInterview", updateInterview);

module.exports = router;
