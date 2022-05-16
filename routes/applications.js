const express = require("express");

const {
  createApplication,
  getApplicationsBySeeker,
  hideApplication,
  unhideAllApplications,
  getApplicationsCountBySeeker,
  getApplicationsReceivedCount,
  getApplicationsReceived,
  rejectApplications,
  acceptApplications,
  filterApplications,
} = require("../controllers/applications");

const router = express.Router();

router.post("/:seekerId/:jobId/:empId/create", createApplication);

router.get("/:seekerId/count/seeker", getApplicationsCountBySeeker);
router.get("/:seekerId/seeker", getApplicationsBySeeker);

router.get("/employer/count/:empId", getApplicationsReceivedCount);
router.get("/:empId/employer/:status", getApplicationsReceived);

router.patch("/seeker/:appId/:seekerId/hide", hideApplication);
// router.patch("/:seekerId", unhideAllApplications);

router.patch("/:empId/rejectApplications", rejectApplications);
router.patch("/acceptApplication/:empId", acceptApplications);

router.get("/filter/:seekerId/:status", filterApplications);

module.exports = router;
