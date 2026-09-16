const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameAr: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true },
    barcode: String,

    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    description: String,
    shortDescription: String,
    ingredients: String,
    usage: String,
    warnings: String,

    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    lowStockThreshold: { type: Number, default: 10 },

    images: [String],
    tags: [String],

    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },

    prescriptionRequired: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },

    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
  },
  { timestamps: true }
);

// Search & filter performance (spec §37)
productSchema.index({ name: "text", nameAr: "text", tags: "text", sku: "text" });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ stock: 1 });

productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});
productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
