const Employer = require("../models/Employer");
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
    responseToClient(res, 400, { error: error.message });
  }
};

//"http://localhost:4000/employers?_sort=rating&_order=desc&_limit=6" + [page]
