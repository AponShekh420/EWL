"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSubCategoryModel = exports.BlogCategoryModel = void 0;
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
    blogs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Blog" }],
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
        ref: "BlogCategory",
        required: true,
    },
}, { timestamps: true });
exports.BlogCategoryModel = (0, mongoose_1.model)("BlogCategory", categorySchema);
exports.BlogSubCategoryModel = (0, mongoose_1.model)("BlogSubCategory", subCategorySchema);
