exports.responseToClient = (res, statusCode, json) => {
  res.status(statusCode).json(json);
};
