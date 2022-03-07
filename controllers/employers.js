const Employer = require("../models/Employer");
const responseToClient = require("../utils/responseToClient");

exports.filterEmployers = async (req, res, next) => {
  let { sort, order, limit, page } = req.query;
  try {
    const employers = await Employer.find()
      .sort({ [sort]: order })
      .limit(limit)
      .populate("openings");
    res.json({ success: true, employers });
  } catch (error) {
    res.json({ error: error.message });
  }
};

//"http://localhost:4000/employers?_sort=rating&_order=desc&_limit=6" + [page]
