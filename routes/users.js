const express = require("express");

const { getOneUser } = require("../controllers/users");

const router = express.Router();

router.get("/:id", getOneUser);

module.exports = router;
