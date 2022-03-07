const express = require("express");

const { filterEmployers } = require("../controllers/employers");

const router = express.Router();

router.get("/", filterEmployers);

module.exports = router;
