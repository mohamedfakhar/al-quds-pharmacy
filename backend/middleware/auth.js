const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

// Verifies the JWT (from HTTP-only cookie or Bearer header) and attaches req.user
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies?.token) token = req.cookies.token;
  else if (req.headers.authorization?.startsWith("Bearer ")) token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new ApiError(401, "Please log in to access this resource"));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) return next(new ApiError(401, "Invalid session, please log in again"));

  req.user = user;
  next();
});

// Role-based authorization — usage: restrictTo("admin", "pharmacist")
exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action"));
  }
  next();
};

// Resource-ownership check — e.g. a customer can only access their own order.
// Pass a function that extracts the owning user id from req/resource.
exports.requireOwnershipOrRoles = (getOwnerId, ...allowedRoles) => (req, res, next) => {
  if (allowedRoles.includes(req.user.role)) return next();
  const ownerId = getOwnerId(req);
  if (String(ownerId) !== String(req.user._id)) {
    return next(new ApiError(403, "You do not have permission to access this resource"));
  }
  next();
};
