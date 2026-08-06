"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceCategoriesByFilters = void 0;
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getResourceCategoriesByFilters = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    if (query.search) {
        searchQuery = {
            $or: [{ name: { $regex: query.search, $options: "i" } }],
        };
    }
    try {
        const categories = await ResourceCategory_1.ResourceCategoryModel.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await ResourceCategory_1.ResourceCategoryModel.countDocuments();
        res.status(200).json({
            success: true,
            data: categories,
            message: "All Resources categories fetched successfully",
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getResourceCategoriesByFilters = getResourceCategoriesByFilters;
