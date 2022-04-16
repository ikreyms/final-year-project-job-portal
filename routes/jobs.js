const express = require("express");

const {
  createJob,
  filterJobs,
  getOneJob,
  getSimilarJobs,
  getJobsByEmployer,
  updateJob,
} = require("../controllers/jobs");

const router = express.Router();

router.post("/:employerId/create", createJob);
router.get("/", filterJobs);
router.get("/:id", getOneJob);
router.get("/getSimilar/:jobId", getSimilarJobs);
router.get("/employer/:empId", getJobsByEmployer);
router.patch("/:jobId", updateJob);

module.exports = router;
