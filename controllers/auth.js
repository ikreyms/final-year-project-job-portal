const User = require("../models/User");
const { responseToClient } = require("../utils/responseToClient");

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, accountType, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      responseToClient(res, 400, {
        success: false,
        error: "User already exists.",
      });
    } else {
      const user = await User.create({
        firstName,
        lastName,
        email,
        accountType,
        password,
      });
      responseToClient(res, 201, { success: true, user });
    }
  } catch (error) {
    let errorMessage = {};
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errorMessage[key] = error.errors[key].message;
      });
      responseToClient(res, 400, { success: false, error: errorMessage });
    } else {
      responseToClient(res, 500, { success: false, error: error.message });
    }
  }
};

exports.login = (req, res, next) => {
  res.send("login route");
};

exports.forgetPassword = (req, res, next) => {
  res.send("forgetPassword route");
};

exports.resetPassword = (req, res, next) => {
  res.send("resetPassword route");
};
