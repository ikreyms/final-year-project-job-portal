const express = require("express");

const {
  createApplication,
  getApplicationsBySeeker,
} = require("../controllers/applications");

const router = express.Router();

router.post("/:seekerId/:jobId/create", createApplication);
router.get("/:seekerId", getApplicationsBySeeker);

module.exports = router;
