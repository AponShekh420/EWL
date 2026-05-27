"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubCategory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CategoryModel_1 = require("../../../../models/CategoryModel");
const catchErrorSend_1 = require("../../../../utils/catchErrorSend");
const createSubCategory = async (req, res, next) => {
    const { name, description, categoryId } = req.body;
    const file = req.file;
    if (!name || !categoryId) {
        return next((0, http_errors_1.default)(400, "Required fields are missing!"));
    }
    if (!file) {
        return next((0, http_errors_1.default)(400, "subcategory thumbnail is missing!"));
    }
    try {
        const subCategory = await CategoryModel_1.SubCategoryModel.create({
            name: name,
            slug: name.replace(" ", "-").toLowerCase(),
            description: description,
            thumbnail: file.filename,
            category: categoryId,
        });
        res.status(201).json({
            success: true,
            data: subCategory,
            message: "Subcategory created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createSubCategory = createSubCategory;
