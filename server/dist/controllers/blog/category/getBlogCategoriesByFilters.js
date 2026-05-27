"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogCategoriesByFilters = void 0;
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const getBlogCategoriesByFilters = async (req, res, next) => {
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
        const categories = await BlogCategoryModel_1.BlogCategoryModel.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await BlogCategoryModel_1.BlogCategoryModel.countDocuments();
        res.status(200).json({
            success: true,
            data: categories,
            message: "All blog categories fetched successfully",
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
exports.getBlogCategoriesByFilters = getBlogCategoriesByFilters;
