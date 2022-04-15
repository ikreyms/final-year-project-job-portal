const express = require("express");

const {
  filterEmployers,
  searchEmployers,
  getOneEmployer,
  updateBranding,
} = require("../controllers/employers");

const router = express.Router();

router.get("/", filterEmployers);
router.get("/search", searchEmployers);
router.get("/:id", getOneEmployer);
router.get("/branding/:id", updateBranding);

module.exports = router;
