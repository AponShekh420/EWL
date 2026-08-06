"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllResourceCategories = void 0;
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllResourceCategories = async (req, res, next) => {
    try {
        const categories = await ResourceCategory_1.ResourceCategoryModel.find();
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
exports.getAllResourceCategories = getAllResourceCategories;
