const ApiError = require("../utils/ApiError");

// Central error handler — never leak stack traces or internal details to the client (spec §34)
module.exports = (err, req, res, next) => {
  let error = err;

  if (err.name === "CastError") error = new ApiError(400, "Invalid identifier");
  if (err.code === 11000) error = new ApiError(409, "This record already exists");
  if (err.name === "ValidationError") error = new ApiError(422, Object.values(err.errors).map(e=>e.message).join(", "));
  if (err.name === "JsonWebTokenError") error = new ApiError(401, "Invalid session, please log in again");
  if (err.name === "TokenExpiredError") error = new ApiError(401, "Session expired, please log in again");

  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : "Something went wrong. Please try again.";

  if (process.env.NODE_ENV !== "production" && !error.isOperational) {
    console.error(err); // full detail only in server logs, never in the response
  }

  res.status(statusCode).json({ success: false, message });
};
