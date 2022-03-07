const Employer = require("../models/Employer");
const responseToClient = require("../utils/responseToClient");

exports.filterEmployers = async (req, res, next) => {
  let { sort, order, limit, page } = req.query;
};
