"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
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
            required: false,
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
        required: false,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    reviews: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
        default: [],
    },
    images: [{ type: String, required: true }],
    sku: { type: String, required: false },
    isbn: { type: String, required: false },
    regularPrice: { type: Number, required: false },
    salePrice: { type: Number, required: true },
    stock: { type: Number, required: false },
    stockStatus: { type: String, required: false },
    isVisibleProductPage: { type: Boolean, required: true, default: true },
    trackStockQuantity: { type: Boolean, required: false, default: false },
    limitOneItemPerOrder: { type: Boolean, required: false, default: false },
    weight: { type: String, required: false },
    declaredValue: { type: Number, required: false },
    dimensionLength: { type: String, required: false },
    dimensionWidth: { type: String, required: false },
    dimensionHeight: { type: String, required: false },
    taxStatus: { type: String, required: false },
    shippingClass: { type: String, required: false },
    enelope: { type: Boolean, required: false },
    customMessage: { type: String, required: false },
    attachment: { type: String, required: false },
    checkoutPageMessage: { type: String, required: false },
    metaTitle: { type: String, required: false },
    metaSlug: { type: String, required: false },
    metaDescription: { type: String, required: false },
}, { timestamps: true });
const productModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = productModel;
