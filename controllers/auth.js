const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const Employer = require("../models/Employer");
const responseToClient = require("../utils/responseToClient");
const sendEmail = require("../utils/sendEmail");
const Admin = require("../models/Admin");
const Notification = require("../models/Notification");
const moment = require("moment");

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

  if (accountType === "Employer") {
    reqMap.set(["accountType", "Account type"], accountType);
    reqMap.set(["companyName", "Company name"], companyName);
    reqMap.set(["sector", "Sector"], sector);
    reqMap.set(["email", "Email"], email);
    reqMap.set(["password", "Password"], password);
    reqMap.set(["repeatPassword", "Repeat password"], repeatPassword);
  } else if (accountType === "Job Seeker") {
    reqMap.set(["accountType", "Account type"], accountType);
    reqMap.set(["firstName", "First name"], firstName);
    reqMap.set(["lastName", "Last name"], lastName);
    reqMap.set(["nid", "National ID number"], nid);
    reqMap.set(["email", "Email"], email);
    reqMap.set(["password", "Password"], password);
    reqMap.set(["repeatPassword", "Repeat password"], repeatPassword);
  }

  let errorObj = {};

  for (let [key, value] of reqMap.entries()) {
    if (value === "") {
      errorObj[key[0]] = `${key[1]} is required.`;
    }
  }

  if (
    !(Object.keys(errorObj).length === 0 && errorObj.constructor === Object)
  ) {
    return responseToClient(res, 400, {
      success: false,
      error: errorObj,
    });
  }

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

    if (errorObj.repeatPassword || errorObj.email || errorObj.nid) {
      return responseToClient(res, 400, {
        success: false,
        error: errorObj,
      });
    }

    if (accountType === "Employer") {
      const employer = await Employer.create({
        accountType,
        companyName,
        sector,
        email,
        password,
      });

      //notify admin that new employer registered
      await Notification.create({
        adminReceiver: true,
        subject: "New Employer Registered",
        body: `New employer named (${employer.companyName}) was registered.`,
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
    return responseToClient(res, 400, {
      success: false,
      error: errorObj,
    });
  }

  let jobSeeker;
  let employer;
  let admin;
  try {
    jobSeeker = await User.findOne({ email }).select("+password");
    employer = await Employer.findOne({ email }).select("+password");
    admin = await Admin.findOne({ email }).select("+password");
    if (!jobSeeker && !employer && !admin) {
      return responseToClient(res, 401, {
        success: false,
        error: { credentials: "Invalid email/password." },
      });
    }

    if (jobSeeker) {
      const isPasswordMatch = await jobSeeker.comparePasswords(password);
      if (isPasswordMatch) {
        sendUserToken(jobSeeker, 200, res);
      } else {
        responseToClient(res, 401, {
          success: false,
          error: { credentials: "Invalid email/password." },
        });
      }
    } else if (employer) {
      const isPasswordMatch = await employer.comparePasswords(password);
      if (isPasswordMatch) {
        sendEmployerToken(employer, 200, res);
      } else {
        responseToClient(res, 401, {
          success: false,
          error: { credentials: "Invalid email/password." },
        });
      }
    } else if (admin) {
      const isPasswordMatch = await admin.comparePasswords(password);
      if (isPasswordMatch) {
        sendAdminToken(admin, 200, res);
      } else {
        responseToClient(res, 401, {
          success: false,
          error: { credentials: "Invalid email/password" },
          hey: "hey",
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
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const jobSeeker = await User.findOne({ email });
    const employer = await Employer.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!jobSeeker && !employer && !admin) {
      return responseToClient(res, 404, {
        success: false,
        error: "Failed to send email.",
      });
    }

    let user;

    if (jobSeeker) user = jobSeeker;
    else if (employer) user = employer;
    else if (admin) user = admin;

    const resetToken = user.setResetPasswordFields();

    await user.save();

    const resetUrl = `http://localhost:3000/auth/resetPassword/${resetToken}`;

    const emailMessage = `
    <h2>Joblookup. Password Reset</h2>
    <p>You have requested a password reset of your joblookup account.</p>
    <p>Click the link below to reset your password</p>
    <a clicktracking="off" href=${resetUrl}>${resetUrl}</a>
    `;

    try {
      sendEmail({
        to: user.email,
        subject: "Joblookup Password Reset Request",
        text: emailMessage,
      });
      responseToClient(res, 200, {
        success: true,
        message: "Password reset link has been sent to the email address.",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiry = undefined;
      await user.save();
      responseToClient(res, 500, {
        success: false,
        error: "Failed to send email.",
      });
      throw { success: false, error: "Failed to send email." };
    }
  } catch (error) {
    responseToClient(res, 500, { error: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const { password, repeatPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  try {
    const jobSeeker = await User.findOne({ resetPasswordToken });
    const employer = await Employer.findOne({ resetPasswordToken });
    const admin = await Admin.findOne({ resetPasswordToken });

    const user = jobSeeker || employer || admin;

    if (!user) {
      return responseToClient(res, 400, {
        error: { resetToken: "Invalid reset token." },
      });
    }

    if (password !== repeatPassword) {
      return responseToClient(res, 400, {
        error: { repeatPassword: "Passwords do not match." },
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    responseToClient(res, 200, { success: true, message: "Password changed." });
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

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return responseToClient(res, 401, {
      sucess: false,
      error: "No valid token found. Login again.",
    });
  try {
    const tokenValid = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenValid) {
      const { email, firstName, accountType, id } = tokenValid;
      responseToClient(res, 200, {
        success: true,
        token,
        user: { email, firstName, accountType, id },
      });
    } else {
      responseToClient(res, 401, {
        sucess: false,
        error: "No valid token found. Login again.",
      });
    }
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "isLoggedIn",
    });
  }
};

const sendUserToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
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
      id: employer._id,
      email: employer.email,
      companyName: employer.companyName,
      accountType: employer.accountType,
    },
    token,
  });
};

const sendAdminToken = (admin, statusCode, res) => {
  const token = admin.getSignedToken();
  res.status(statusCode).json({
    success: true,
    user: {
      id: admin._id,
      email: admin.email,
      accountType: admin.accountType,
    },
    token,
  });
};
