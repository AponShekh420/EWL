"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReview = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const ReviewModel_1 = __importDefault(require("../../../models/ReviewModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateReview = async (req, res, next) => {
    const id = req.params?.id;
    const body = req.body;
    try {
        if (!id)
            return next((0, http_errors_1.default)(400, "Review ID is required"));
        // Find old order
        const oldReview = await ReviewModel_1.default.findById(id);
        if (!oldReview)
            return next((0, http_errors_1.default)(404, "Review not found"));
        const updatedData = { ...body };
        // ---- UPDATE Cart ----
        const updatedReview = await ReviewModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        //if status approved then store in product model
        if (body.status === "approved") {
            await ProductModel_1.default.findByIdAndUpdate(oldReview.product, {
                $push: { reviews: id },
            });
        }
        else {
            await ProductModel_1.default.findByIdAndUpdate(oldReview.product, {
                $pull: { reviews: id },
            });
        }
        if (!updatedReview)
            return next((0, http_errors_1.default)(400, "Failed to update review"));
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedReview,
            message: "Review updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateReview = updateReview;
