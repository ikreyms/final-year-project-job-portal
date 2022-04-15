const express = require("express");

const {
  createJob,
  filterJobs,
  getOneJob,
  getSimilarJobs,
  getJobsByEmployer,
} = require("../controllers/jobs");

const router = express.Router();

router.post("/:employerId/create", createJob);
router.get("/", filterJobs);
router.get("/:id", getOneJob);
router.get("/getSimilar/:jobId", getSimilarJobs);
router.get("/employer/:empId", getJobsByEmployer);

module.exports = router;
