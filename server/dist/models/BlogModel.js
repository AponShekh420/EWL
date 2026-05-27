"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
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
    description: {
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    metaTitle: { type: String, required: false },
    metaSlug: { type: String, required: false },
    metaDescription: { type: String, required: false },
}, { timestamps: true });
const blogModel = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = blogModel;
