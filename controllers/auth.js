const User = require("../models/User");
const { responseToClient } = require("../utils/responseToClient");

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, accountType, password, repeatPassword } =
    req.body;

  const reqMap = new Map();

  reqMap.set(["firstName", "First name"], firstName);
  reqMap.set(["lastName", "Last name"], lastName);
  reqMap.set(["email", "Email"], email);
  reqMap.set(["accountType", "Account type"], accountType);
  reqMap.set(["password", "Password"], password);
  reqMap.set(["repeatPassword", "Repeat password"], repeatPassword);

  let errorObj = {};

  for (let [key, value] of reqMap.entries()) {
    if (value === "") {
      errorObj[key[0]] = `${key[1]} is required.`;
    }
  }

  if (
    !(Object.keys(errorObj).length === 0 && errorObj.constructor === Object)
  ) {
    responseToClient(res, 400, {
      success: false,
      error: errorObj,
    });
  } else {
    if (password !== repeatPassword) {
      errorObj.repeatPassword = "Passwords must match.";
    }
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        errorObj.email = "User already exists.";
      }
      if (errorObj.repeatPassword || errorObj.email) {
        responseToClient(res, 400, {
          success: false,
          error: errorObj,
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
