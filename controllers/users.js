const User = require("../models/User");
const Employer = require("../models/Employer");
const responseToClient = require("../utils/responseToClient");

exports.getOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user)
      return responseToClient(res, 404, {
        success: false,
        error: "Job seeker not found.",
      });

    responseToClient(res, 200, { success: true, user });
  } catch (error) {
    responseToClient(res, 400, {
      success: false,
      error: "Job seeker not found.",
    });
  }
};

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
  const { userId, employerId } = req.params;
  let { value } = req.params;

  if (value === "null") value = "0";

  try {
    const exists = await User.exists({ _id: userId });
    if (!exists)
      return responseToClient(res, 401, { error: "Invalid User Id" });

    const userHaveRated = await User.findOne(
      {
        _id: userId,
        "ratings._id": employerId,
      },
      "ratings"
    );

    if (userHaveRated) {
      const prevRating = userHaveRated.ratings
        .filter((i) => i.get("_id") === employerId)[0]
        .get("value");

      if (prevRating === value)
        return responseToClient(res, 400, {
          success: false,
          message: `You have already rated the employer ${value} stars.`,
        });

      await User.updateOne(
        { _id: userId, "ratings._id": employerId },
        {
          $set: {
            "ratings.$.value": value,
          },
        }
      );

      await Employer.updateOne(
        { _id: employerId },
        { $inc: { totalRatings: value - prevRating } }
      );

      return responseToClient(res, 200, {
        success: true,
        message: `You have updated your rating for this employer to ${value} stars.`,
      });
    }

    // if not rated before

    await User.updateOne(
      { _id: userId },
      { $push: { ratings: { _id: employerId, value: value } } }
    );

    await Employer.updateOne(
      { _id: employerId },
      { $inc: { totalRatings: value, ratingsSubmitted: 1 } }
    );

    responseToClient(res, 201, {
      success: true,
      message: `You have added a new rating of ${value} stars for this employer.`,
    });
  } catch (error) {
    responseToClient(res, 401, { success: false, error: error.message });
  }
};
