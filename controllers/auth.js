const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employer = require("../models/Employer");
const { responseToClient } = require("../utils/responseToClient");

exports.signup = async (req, res, next) => {
  const {
    accountType,
    companyName,
    sector,
    firstName,
    lastName,
    nid,
    email,
    password,
    repeatPassword,
  } = req.body;

  const reqMap = new Map();

  reqMap.set(["accountType", "Account type"], accountType);
  reqMap.set(["companyName", "Company name"], companyName);
  reqMap.set(["sector", "Sector"], sector);
  reqMap.set(["firstName", "First name"], firstName);
  reqMap.set(["lastName", "Last name"], lastName);
  reqMap.set(["nid", "National ID number"], nid);
  reqMap.set(["email", "Email"], email);
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
      let exists;
      switch (accountType) {
        case "Employer":
          exists = await Employer.findOne({ email });
          break;
        case "Job Seeker":
          exists = await User.findOne({ email });
          break;
        default:
          break;
      }
      if (exists) {
        errorObj.email = "User already exists.";
      }
      if (errorObj.repeatPassword || errorObj.email) {
        responseToClient(res, 400, {
          success: false,
          error: errorObj,
        });
      } else {
        if (accountType === "Employer") {
          const employer = await Employer.create({
            accountType,
            companyName,
            sector,
            email,
            password,
          });
          sendEmployerToken(employer, 201, res);
        } else if (accountType === "Job Seeker") {
          const user = await User.create({
            accountType,
            firstName,
            lastName,
            nid,
            email,
            password,
          });
          sendUserToken(user, 201, res);
        }
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const reqMap = new Map();

  reqMap.set(["email", "Email"], email);
  reqMap.set(["password", "Password"], password);

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
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        responseToClient(res, 401, {
          success: false,
          error: { credentials: "Invalid email/password." },
        });
      } else {
        const isPasswordMatch = await user.comparePasswords(password);
        if (isPasswordMatch) {
          sendToken(user, 200, res);
        } else {
          responseToClient(res, 401, {
            success: false,
            error: { credentials: "Invalid email/password." },
          });
        }
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

exports.forgetPassword = (req, res, next) => {
  res.send("forgetPassword route");
};

exports.resetPassword = (req, res, next) => {
  res.send("resetPassword route");
};

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(req.headers);
  if (!token) return responseToClient(res, 401, { error: "No token" });
  try {
    const tokenValid = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenValid);
    if (tokenValid) {
      const { email, firstName, accountType, id } = tokenValid;
      return responseToClient(res, 200, {
        success: true,
        token,
        user: { email, firstName, accountType, id },
      });
    }
  } catch (error) {
    responseToClient(res, 401, {
      success: false,
      error: { notAuth: "Login first." },
    });
  }
};

const sendUserToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    user: {
      email: user.email,
      firstName: user.firstName,
      accountType: user.accountType,
    },
    token,
  });
};

const sendEmployerToken = (employer, statusCode, res) => {
  const token = employer.getSignedToken();
  res.status(statusCode).json({
    success: true,
    user: {
      email: employer.email,
      companyName: employer.companyName,
      accountType: employer.accountType,
    },
    token,
  });
};
