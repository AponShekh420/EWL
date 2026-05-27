"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByFilter = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getProductByFilter = async (req, res, next) => {
    try {
        const query = req.query;
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const skip = (page - 1) * limit;
        let searchQuery = {};
        let sortQuery = { createdAt: -1 }; // default
        if (query.search) {
            searchQuery = {
                $or: [{ title: { $regex: query.search, $options: "i" } }],
            };
        }
        if (query.category) {
            searchQuery.category = query.category;
        }
        if (query.tag) {
            searchQuery.tags = { $in: [query.tag] };
        }
        if (query.tag) {
            searchQuery.tags = { $in: [query.tag] };
        }
        if (query.visible) {
            searchQuery.isVisibleProductPage = true;
        }
        if (query.minPrice && query.maxPrice) {
            searchQuery.salePrice = {
                $gte: Number(query.minPrice),
                $lte: Number(query.maxPrice),
            };
        }
        // console.log("objectserch", searchQuery)
        // console.log("query", query)
        if (query.sort) {
            if (query.sort === "popularity") {
                sortQuery = { sold: -1 };
            }
            else if (query.sort === "average-rating") {
                sortQuery = { averageRating: -1 };
            }
            else if (query.sort === "price-low-to-high") {
                sortQuery = { salePrice: 1 };
            }
            else if (query.sort === "price-high-to-low") {
                sortQuery = { salePrice: -1 };
            }
        }
        const products = await ProductModel_1.default
            .find(searchQuery)
            .skip(skip)
            .limit(limit)
            .populate("reviews")
            .sort(sortQuery);
        if (!products) {
            return next((0, http_errors_1.default)(400, "Not found products"));
        }
        const product = await ProductModel_1.default.findOne().sort({ salePrice: -1 });
        const total = await ProductModel_1.default.countDocuments();
        res.status(200).json({
            success: true,
            data: products,
            price: {
                maxPrice: Number(product?.salePrice) || 0,
                minPrice: 0,
            },
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
            message: "All Product fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getProductByFilter = getProductByFilter;
