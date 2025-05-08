const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  return res.status(statusCode).json({ error: error.message });
};

module.exports = errorHandler;
