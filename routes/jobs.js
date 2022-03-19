const express = require("express");

const { createJob, filterJobs } = require("../controllers/jobs");

const router = express.Router();

router.post("/:employerId/create", createJob);
router.get("/", filterJobs);

module.exports = router;
