"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const ResourceCategorySchema = new mongoose_1.Schema({
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
    resources: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Resources" }],
}, { timestamps: true });
exports.ResourceCategoryModel = (0, mongoose_1.model)("ResourceCategory", ResourceCategorySchema);
