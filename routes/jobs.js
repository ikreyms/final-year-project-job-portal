const express = require("express");

const {
  createJob,
  filterJobs,
  getOneJob,
  getSimilarJobs,
} = require("../controllers/jobs");

const router = express.Router();

router.post("/:employerId/create", createJob);
router.get("/", filterJobs);
router.get("/:id", getOneJob);
router.get("/getSimilar/:jobId", getSimilarJobs);

module.exports = router;
