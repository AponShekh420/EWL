"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductBySlug = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getProductBySlug = async (req, res, next) => {
    try {
        const slug = req.params?.slug;
        if (!slug)
            return next((0, http_errors_1.default)(400, "Product slug is required"));
        const product = await ProductModel_1.default.findOne({ slug }).populate({
            path: "reviews",
            populate: {
                path: "customer",
                select: "firstName lastName userName email avatar",
            },
        });
        if (!product) {
            return next((0, http_errors_1.default)(400, "Not found product"));
        }
        return res.status(200).json({
            success: true,
            data: product,
            message: "Product fetched by id successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getProductBySlug = getProductBySlug;
