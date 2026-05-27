"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviewByProductId = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ReviewModel_1 = __importDefault(require("../../../models/ReviewModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllReviewByProductId = async (req, res, next) => {
    try {
        const id = req.params?.productId;
        const reviews = await ReviewModel_1.default.find({ product: id });
        if (!reviews) {
            return next((0, http_errors_1.default)(400, "Not found review"));
        }
        res.status(200).json({
            success: true,
            data: reviews,
            message: "All review fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllReviewByProductId = getAllReviewByProductId;
