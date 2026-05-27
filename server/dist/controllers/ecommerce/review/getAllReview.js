"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReview = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const ReviewModel_1 = __importDefault(require("../../../models/ReviewModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllReview = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    try {
        if (query.search) {
            const products = await ProductModel_1.default
                .find({
                title: { $regex: query.search, $options: "i" },
            })
                .select("_id");
            if (products.length > 0) {
                searchQuery = { product: { $in: products.map((p) => p._id) } };
            }
        }
        const reviews = await ReviewModel_1.default.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate(["product", "customer"]);
        if (!reviews) {
            return next((0, http_errors_1.default)(400, "Not found review"));
        }
        const total = await ReviewModel_1.default.countDocuments();
        res.status(200).json({
            success: true,
            data: reviews,
            message: "All review fetched successfully",
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
exports.getAllReview = getAllReview;
