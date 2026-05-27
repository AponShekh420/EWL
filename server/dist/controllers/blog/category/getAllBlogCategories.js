"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogCategories = void 0;
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const getAllBlogCategories = async (req, res, next) => {
    try {
        const categories = await BlogCategoryModel_1.BlogCategoryModel.find();
        res.status(200).json({
            success: true,
            data: categories,
            message: "All blog categories fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllBlogCategories = getAllBlogCategories;
