const express = require("express");

const {
  createApplication,
  getApplicationsBySeeker,
  hideApplication,
  unhideAllApplications,
  getApplicationsCountBySeeker,
  getApplicationsReceivedCount,
  getApplicationsReceived,
} = require("../controllers/applications");

const router = express.Router();

router.post("/:seekerId/:jobId/:empId/create", createApplication);

router.get(":seekerId/count/seeker", getApplicationsCountBySeeker);
router.get("/:seekerId/seeker", getApplicationsBySeeker);

router.get("employer/count/:empId", getApplicationsReceivedCount);
router.get("/:empId/employer", getApplicationsReceived);

router.patch("/:appId/:seekerId", hideApplication);
router.patch("/:seekerId", unhideAllApplications);

module.exports = router;
