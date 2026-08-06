"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResourcesSchema = new mongoose_1.Schema({
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    slug: { type: String, required: true },
    category: {
        type: String,
        required: true,
    },
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
}, { timestamps: true });
const ResourcesModel = (0, mongoose_1.model)("Resources", ResourcesSchema);
exports.default = ResourcesModel;
