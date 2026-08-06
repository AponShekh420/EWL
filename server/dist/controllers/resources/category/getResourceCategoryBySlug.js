"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceCategoryBySlug = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getResourceCategoryBySlug = async (req, res, next) => {
    try {
        const slug = req.params?.slug;
        if (!slug)
            return next((0, http_errors_1.default)(400, "Category slug is required"));
        const category = await ResourceCategory_1.ResourceCategoryModel.findOne({ slug });
        if (!category) {
            return next((0, http_errors_1.default)(400, "Not found Category"));
        }
        return res.status(200).json({
            success: true,
            data: category,
            message: "Resources category fetched by slug successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getResourceCategoryBySlug = getResourceCategoryBySlug;
