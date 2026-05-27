"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubAllCategories = void 0;
const CategoryModel_1 = require("../../../../models/CategoryModel");
const catchErrorSend_1 = require("../../../../utils/catchErrorSend");
const getSubAllCategories = async (req, res, next) => {
    try {
        const subCategories = await CategoryModel_1.SubCategoryModel.find().populate("category");
        res.status(200).json({
            success: true,
            data: subCategories,
            message: "All subcategory fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getSubAllCategories = getSubAllCategories;
