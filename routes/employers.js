const express = require("express");

const {
  filterEmployers,
  searchEmployers,
  getOneEmployer,
  updateBranding,
  removeEmployer,
  verifyEmployer,
  deVerifyEmployer,
} = require("../controllers/employers");

const router = express.Router();

router.get("/", filterEmployers);
router.get("/search", searchEmployers);
router.get("/:id", getOneEmployer);
router.patch("/branding/:id", updateBranding);
router.patch("/verify/:id", verifyEmployer);
router.patch("/deVerify/:id", deVerifyEmployer);
router.delete("/:id", removeEmployer);

module.exports = router;
