const express = require("express");

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword/:resetToken", resetPassword);

module.exports = router;
