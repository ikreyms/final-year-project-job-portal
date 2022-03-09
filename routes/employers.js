const express = require("express");

const {
  filterEmployers,
  searchEmployers,
} = require("../controllers/employers");

const router = express.Router();

router.get("/", filterEmployers);
router.get("/search", searchEmployers);

module.exports = router;
