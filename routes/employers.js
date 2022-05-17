const express = require("express");

const {
  filterEmployers,
  searchEmployers,
  getOneEmployer,
  updateBranding,
  removeEmployer,
} = require("../controllers/employers");

const router = express.Router();

router.get("/", filterEmployers);
router.get("/search", searchEmployers);
router.get("/:id", getOneEmployer);
router.patch("/branding/:id", updateBranding);
router.delete("/:id", removeEmployer);

module.exports = router;
