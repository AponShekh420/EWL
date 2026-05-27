"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryModel = exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
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
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
    subcategory: [
        {
            type: String,
        },
    ],
}, { timestamps: true });
const subCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.SubCategoryModel = (0, mongoose_1.model)("SubCategory", subCategorySchema);
