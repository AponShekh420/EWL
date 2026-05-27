"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ReviewModel_1 = __importDefault(require("../../../models/ReviewModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteReview = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Review ID is required"));
        const deletedReview = await ReviewModel_1.default.findByIdAndDelete(id);
        if (!deletedReview) {
            return next((0, http_errors_1.default)(404, `Review with id ${id} not found`));
        }
        return res.status(200).json({
            success: true,
            data: deletedReview,
            message: `Review with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteReview = deleteReview;
