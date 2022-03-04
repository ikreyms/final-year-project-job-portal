const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  isLoggedIn,
} = require("../controllers/auth");

const router = express.Router();

router.post("/", isLoggedIn);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resetToken", resetPassword);

module.exports = router;
