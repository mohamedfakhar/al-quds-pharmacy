const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const Product = require("../models/Product");

// Server-side search, filtering, sorting & pagination — the frontend
// NEVER loads the full catalog and filters in JS (spec §9/§10/§35).
exports.getProducts = catchAsync(async (req, res) => {
  const {
    q, category, brand, minPrice, maxPrice, inStock,
    prescriptionRequired, tag, sort = "relevance",
    page = 1, limit = 24,
  } = req.query;

  const filter = { isActive: true };
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;
  if (brand) filter.brand = { $in: [].concat(brand) };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (inStock === "true") filter.stock = { $gt: 0 };
  if (prescriptionRequired !== undefined) filter.prescriptionRequired = prescriptionRequired === "true";
  if (tag) filter.tags = tag;

  const sortMap = {
    relevance: q ? { score: { $meta: "textScore" } } : { isFeatured: -1, createdAt: -1 },
    newest: { createdAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    rating: { ratingAverage: -1 },
    popular: { reviewsCount: -1 },
  };

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Product.find(filter)
      .select("-__v -description -ingredients -usage -warnings -seoTitle -seoDescription -seoKeywords") // don't over-fetch listing fields
      .sort(sortMap[sort] || sortMap.relevance)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  });
});

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate("brand", "name slug")
    .populate("category", "name slug");
  if (!product) return next(new ApiError(404, "Product not found"));
  res.status(200).json({ success: true, data: product });
});
