"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubcategory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CategoryModel_1 = require("../../../../models/CategoryModel");
const catchErrorSend_1 = require("../../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../../utils/deleteFileFromLocal");
const updateSubcategory = async (req, res, next) => {
    const body = req.body;
    const file = req.file;
    const updatedData = { ...body };
    if (body && body.categoryId) {
        updatedData.category = body.categoryId;
    }
    if (body && body.name) {
        updatedData.name = body.name;
        updatedData.slug = body.name.replace(" ", "-").toLowerCase();
    }
    if (body && body.description) {
        updatedData.description = body.description;
    }
    if (file) {
        updatedData.thumbnail = file.filename;
    }
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Subcategory ID is required"));
        // Fetch the old category to delete the previous image if replaced
        const oldSubcategory = await CategoryModel_1.SubCategoryModel.findById(id);
        if (!oldSubcategory)
            return next((0, http_errors_1.default)(404, "Subcategory not found"));
        const updatedSubcategory = await CategoryModel_1.SubCategoryModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedSubcategory)
            return next((0, http_errors_1.default)(400, "Failed to update subcategory"));
        if (body.deletedImage) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)(body.deletedImage, "category");
        }
        return res.status(200).json({
            success: true,
            data: updatedSubcategory,
            message: "Subcategory updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateSubcategory = updateSubcategory;
