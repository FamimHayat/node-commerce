const responseHandler = (
  res,
  message = "",
  statusCode = 400,
  success = false,
  data = null,
  error = null
) => {
  return res.status(statusCode).json({
    success,
    message,
    ...(data !== null && { data }),
    ...(error !== null && { error }),
  });
};

module.exports = { responseHandler };
