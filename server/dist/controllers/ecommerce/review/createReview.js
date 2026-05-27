"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const ReviewModel_1 = __importDefault(require("../../../models/ReviewModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const createReview = async (req, res, next) => {
    try {
        const { review, rating, productId } = req.body;
        const userId = req.user?._id;
        const createdReview = await ReviewModel_1.default.create({
            review,
            rating,
            product: productId,
            customer: userId,
        });
        if (!createdReview) {
            return next((0, http_errors_1.default)(400, "Failed to add review"));
        }
        await ProductModel_1.default.findByIdAndUpdate(productId, {
            $push: { reviews: createdReview._id },
        });
        return res.status(201).json({
            success: true,
            data: createdReview,
            message: "Review created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createReview = createReview;
