module.exports = (res, statusCode, json) => {
  res.status(statusCode).json(json);
};
