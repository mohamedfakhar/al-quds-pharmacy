const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const { generateToken, sendTokenCookie } = require("../utils/generateToken");

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return next(new ApiError(409, "An account with this email already exists"));

  // role is NEVER taken from the client — prevents privilege escalation via mass assignment (spec §31)
  const user = await User.create({ name, email, phone, password, role: "customer" });

  const token = generateToken(user._id, user.role);
  sendTokenCookie(res, token);
  res.status(201).json({ success: true, data: { user } });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ApiError(401, "Invalid email or password"));
  }
  if (!user.isActive) return next(new ApiError(403, "This account has been deactivated"));

  const token = generateToken(user._id, user.role);
  sendTokenCookie(res, token);
  res.status(200).json({ success: true, data: { user } });
});

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, data: null });
};

exports.getMe = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});
