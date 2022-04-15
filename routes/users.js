const express = require("express");

const {
  getOneUser,
  getUserRatingsAndFollowing,
  followNewEmployer,
  unfollowNewEmployer,
  rateEmployer,
  updateResume,
} = require("../controllers/users");

const router = express.Router();

router.get("/:id", getOneUser);
router.get("/:id/getUserRatingsAndFollowing", getUserRatingsAndFollowing);
router.patch("/follow/:userId/:employerId", followNewEmployer);
router.patch("/unfollow/:userId/:employerId", unfollowNewEmployer);
router.patch("/rate/:userId/:employerId/:value", rateEmployer);
router.patch("/resume/:userId", updateResume);

module.exports = router;
