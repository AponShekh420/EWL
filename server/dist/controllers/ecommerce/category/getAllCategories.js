"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const CategoryModel_1 = require("../../../models/CategoryModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel_1.CategoryModel.find();
        res.status(200).json({
            success: true,
            data: categories,
            message: "All category fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllCategories = getAllCategories;
