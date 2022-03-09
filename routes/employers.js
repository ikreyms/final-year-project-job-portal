const express = require("express");

const {
  filterEmployers,
  searchEmployers,
  getOneEmployer,
} = require("../controllers/employers");

const router = express.Router();

router.get("/", filterEmployers);
router.get("/search", searchEmployers);
router.get("/:id", getOneEmployer);

module.exports = router;
