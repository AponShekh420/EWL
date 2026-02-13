import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "draft", "publish"],
      default: "pending",
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
      default: [],
    },
    images: [{ type: String, required: true }],
    sku: { type: String, required: true },
    isbn: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    stockStatus: { type: String, required: true },
    isVisibleProductPage: { type: Boolean, required: true },
    trackStockQuantity: { type: Boolean, required: true },
    limitOneItemPerOrder: { type: Boolean, required: true },
    weight: { type: String, required: true },
    declaredValue: { type: Number, required: true },
    dimensionLength: { type: String, required: true },
    dimensionWidth: { type: String, required: true },
    dimensionHeight: { type: String, required: true },
    taxStatus: { type: String, required: true },
    taxClass: { type: String, required: true },
    shippingClass: { type: String, required: true },
    enelope: { type: Boolean, required: true },
    customMessage: { type: String, required: true },
    attachment: { type: String, required: true },
    checkoutPageMessage: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
  },
  { timestamps: true },
);

const productModel = model("Product", productSchema);

export default productModel;
