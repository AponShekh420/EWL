"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogCategory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const updateBlogCategory = async (req, res, next) => {
    const body = req.body;
    const file = req.file;
    const updatedData = { ...body };
    if (body && body.name) {
        updatedData.name = body.name;
        updatedData.slug = body.name.replace(" ", "-").toLowerCase();
    }
    if (file) {
        updatedData.thumbnail = file.filename;
    }
    if (body && body.description) {
        updatedData.description = body.description;
    }
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Category ID is required"));
        // Fetch the old category to delete the previous image if replaced
        const oldCategory = await BlogCategoryModel_1.BlogCategoryModel.findById(id);
        if (!oldCategory)
            return next((0, http_errors_1.default)(404, "Blog category not found"));
        const updatedCategory = await BlogCategoryModel_1.BlogCategoryModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedCategory)
            return next((0, http_errors_1.default)(400, "Failed to update category"));
        if (body.deletedImage) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)(body.deletedImage, "blog-category");
        }
        return res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Blog category updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateBlogCategory = updateBlogCategory;
