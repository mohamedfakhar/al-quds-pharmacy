const catchAsync = require("../utils/catchAsync");
const Category = require("../models/Category");

exports.getCategories = catchAsync(async (req, res) => {
  const categories = await Category.find({ isActive: true, parent: null }).sort({ name: 1 });
  res.status(200).json({ success: true, data: categories });
});
