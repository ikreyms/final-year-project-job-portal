const User = require("../models/User");
const responseToClient = require("../utils/responseToClient");

exports.getOneUser = async (req, res, next) => {};

exports.getUserRatingsAndFollowing = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id })
      .populate("ratings")
      .populate("following");
    if (user) {
      return responseToClient(res, 200, user);
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
    responseToClient(res, 300, {
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
      return responseToClient(res, 300, {
        message: "You don't follow this employer.",
      });
    }
    await User.updateOne({ _id: userId }, { $pull: { following: employerId } });
    responseToClient(res, 200, { message: "You unfollowed the employer." });
  } catch (error) {
    responseToClient(res, 401, { error: error.message });
  }
};
