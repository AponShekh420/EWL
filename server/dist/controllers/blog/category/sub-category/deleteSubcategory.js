"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CategoryModel_1 = require("../../../../models/CategoryModel");
const catchErrorSend_1 = require("../../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../../utils/deleteFileFromLocal");
const deleteSubcategory = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Subategory ID is required"));
        const deletedProduct = await CategoryModel_1.SubCategoryModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return next((0, http_errors_1.default)(404, `Subcategory with id ${id} not found`));
        }
        (0, deleteFileFromLocal_1.deleteFileFromLocal)(deletedProduct.thumbnail, "category");
        return res.status(200).json({
            success: true,
            data: deletedProduct,
            message: "Subcategory deleted successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteSubcategory = deleteSubcategory;
