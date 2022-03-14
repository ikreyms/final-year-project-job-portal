const User = require("../models/User");
const Employer = require("../models/Employer");
const responseToClient = require("../utils/responseToClient");

exports.getOneUser = async (req, res, next) => {};

exports.getUserRatingsAndFollowing = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id })
      .populate("ratings")
      .populate("following");
    // console.log(user);
    if (user) {
      return responseToClient(res, 200, {
        following: user.following,
        ratings: user.ratings,
      });
    }
    responseToClient(res, 404, { error: "User not found." });
  } catch (error) {
    responseToClient(res, 400, { error: error.message });
  }
};

exports.followNewEmployer = async (req, res, next) => {
  const { userId, employerId } = req.params;

  try {
    const exists = await User.exists({ _id: userId });
    if (!exists)
      return responseToClient(res, 401, { error: "Invalid User Id" });

    const user = await User.findOne({
      _id: userId,
      following: { $in: [employerId] },
    });

    if (!user) {
      await User.updateOne(
        { _id: userId },
        { $push: { following: employerId } }
      );
      return responseToClient(res, 200, {
        message: "You are now following that Employer.",
      });
    }
    responseToClient(res, 400, {
      message: "You already follow this employer.",
    });
  } catch (error) {
    responseToClient(res, 401, { error: error.message });
  }
};

exports.unfollowNewEmployer = async (req, res, next) => {
  const { userId, employerId } = req.params;

  try {
    const exists = await User.exists({ _id: userId });
    if (!exists)
      return responseToClient(res, 401, { error: "Invalid User Id" });

    const user = await User.findOne({
      _id: userId,
      following: { $in: [employerId] },
    });

    // if not following
    if (!user) {
      return responseToClient(res, 400, {
        message: "You don't follow this employer.",
      });
    }
    await User.updateOne({ _id: userId }, { $pull: { following: employerId } });
    responseToClient(res, 200, { message: "You unfollowed the employer." });
  } catch (error) {
    responseToClient(res, 401, { error: error.message });
  }
};

exports.rateEmployer = async (req, res, next) => {
  const { userId, employerId, value } = req.params;

  try {
    const exists = await User.exists({ _id: userId });
    if (!exists)
      return responseToClient(res, 401, { error: "Invalid User Id" });

    const user = await User.findOne({
      _id: userId,
      "ratings._id": { $in: [employerId] },
      "ratings.value": { $in: [value] },
    });

    if (!user) {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            ratings: {
              _id: employerId,
              value: value,
            },
          },
        }
      );

      let incrementRatingsSubmittedBy = 1;
      // const user2 = await User.findOne({
      //   _id: userId,
      //   "ratings._id": { $in: [employerId] },
      // });

      // if (user2?.ratings) {
      //   for (const key in user2.ratings) {
      //     if (key["_id"] === String(employerId)) {
      //       console.log(key, employerId);
      //       incrementRatingsSubmittedBy = 0;
      //       break;
      //     }
      //   }
      // }

      // console.log(incrementRatingsSubmittedBy);

      await Employer.updateOne(
        { _id: employerId },
        {
          $inc: {
            totalRatings: value,
            ratingsSubmitted: incrementRatingsSubmittedBy,
          },
        }
      );

      // const ratingData = await Employer.find(
      //   { _id: employerId },
      //   "totalRatings ratingsSubmitted"
      // );

      return responseToClient(res, 200, {
        success: true,
        message: {
          userRatings: `You have rated the employer ${value} stars.`,
          employerRating: "Employer totalRatings and ratingsSubmitted updated.",
        },
        // ratingData,
      });
    }
    responseToClient(res, 400, {
      success: false,
      message: "You already have rated this employer with same rating.",
    });
  } catch (error) {
    responseToClient(res, 401, { success: false, error: error.message });
  }
};
