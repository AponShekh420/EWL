"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoryById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CategoryModel_1 = require("../../../../models/CategoryModel");
const catchErrorSend_1 = require("../../../../utils/catchErrorSend");
const getSubCategoryById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Subcategory ID is required"));
        const subcategory = await CategoryModel_1.SubCategoryModel.findById(id);
        if (!subcategory) {
            return next((0, http_errors_1.default)(400, "Not found subcategory"));
        }
        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "subcategory fetched by id successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getSubCategoryById = getSubCategoryById;
