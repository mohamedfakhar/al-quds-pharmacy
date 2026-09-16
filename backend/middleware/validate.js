const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

// Run after express-validator chains to turn failures into a 422 ApiError
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(422, errors.array().map(e => e.msg).join(", ")));
  }
  next();
};
