const express = require("express");

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  isLoggedIn,
} = require("../controllers/auth");

const router = express.Router();

router.post("/", isLoggedIn);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword/:resetToken", resetPassword);

module.exports = router;
