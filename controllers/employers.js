const Employer = require("../models/Employer");
const Job = require("../models/Job");
const equals = require("../utils/equals");
const responseToClient = require("../utils/responseToClient");

exports.filterEmployers = async (req, res, next) => {
  let { sort, order, limit, page } = req.query;
  let skip;
  let query;
  let dbFieldObject = {};
  Object.keys(req.query).filter((key) => {
    if (
      key !== "sort" &&
      key !== "order" &&
      key !== "limit" &&
      key !== "page"
    ) {
      dbFieldObject[[key]] = req.query[key];
      return true;
    }
  });

  try {
    const count = await Employer.estimatedDocumentCount();

    if (!page) {
      query = await Employer.find(dbFieldObject)
        .sort({ [sort]: order })
        .limit(limit)
        .populate("openings")
        .populate("jobsPosted")
        .populate("followers");
    } else {
      if (limit === undefined) limit = 10;
      skip = 10 * page - 10;
      query = await Employer.find(dbFieldObject)
        .sort({ [sort]: order })
        .populate("openings")
        .populate("jobsPosted")
        .populate("followers")
        .skip(skip)
        .limit(limit);
    }
    res
      .set("total-doc-count", count)
      .status(200)
      .json({ success: true, employers: query });
  } catch (error) {
    responseToClient(res, 500, { success: false, error: error.message });
  }
};

exports.searchEmployers = async (req, res, next) => {
  let { term } = req.query;
  const regex = new RegExp(`${term}`, "i");

  try {
    const employers = await Employer.find({
      companyName: { $regex: regex },
    }).populate("openings");

    res
      .set("total-doc-count", employers.length)
      .status(200)
      .json({ success: true, employers });
  } catch (error) {
    responseToClient(res, 400, { success: false, error: error.message });
  }
};

exports.getOneEmployer = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const employer = await Employer.findOne({ _id: id })
        .populate("openings")
        .populate("followers");
      if (!employer)
        return responseToClient(res, 400, {
          success: false,
          error: "No employer found.",
        });
      return res
        .set("total-doc-count", employer.length)
        .status(200)
        .json({ success: true, employer });
    } catch (error) {
      return responseToClient(res, 400, {
        success: false,
        error: "No employer found.",
      });
    }
  }
  responseToClient(res, 400, {
    success: false,
    error: "No employer found.",
  });
};

exports.updateBranding = async (req, res, next) => {
  const { id } = req.params;

  const {
    image,
    companyName,
    sector,
    location,
    contact,
    email,
    about,
    mission,
    whyWorkWithUs,
  } = req.body;

  try {
    let employer = await Employer.findOne({ _id: id });

    employer.image !== image && (employer.image = image);
    employer.companyName !== companyName &&
      (employer.companyName = companyName);
    employer.sector !== sector && (employer.sector = sector);
    employer.location !== location && (employer.location = location);
    employer.contact !== contact && (employer.contact = contact);
    employer.email !== email && (employer.email = email);
    employer.about !== about && (employer.about = about);
    employer.mission !== mission && (employer.mission = mission);

    !equals(employer.whyWorkWithUs, whyWorkWithUs) &&
      (employer.whyWorkWithUs = whyWorkWithUs);

    await employer.save();
    responseToClient(res, 200, { success: true, employer });
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

exports.removeEmployer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const employerDeletedCount = await Employer.deleteOne({ _id: id });
    const jobDeletedCount = await Job.deleteMany({ postedBy: id });
    responseToClient(res, 200, {
      success: true,
      employerDeletedCount,
      jobDeletedCount,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: "No employer found.",
      errorFrom: "removeEmployer",
    });
  }
};

exports.verifyEmployer = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Employer.updateOne({ _id: id }, { $set: { verified: true } });
    responseToClient(res, 200, {
      success: true,
      message: "Employer verified.",
      verified: true,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "verifyEmployer",
    });
  }
};

exports.deVerifyEmployer = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Employer.updateOne({ _id: id }, { $set: { verified: false } });
    responseToClient(res, 200, {
      success: true,
      message: "Employer verification cancelled.",
      verified: false,
    });
  } catch (error) {
    responseToClient(res, 500, {
      success: false,
      error: error.message,
      errorFrom: "deVerifyEmployer",
    });
  }
};
