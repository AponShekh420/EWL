"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStatus = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateProductStatus = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const body = req.body;
        if (!id)
            return next((0, http_errors_1.default)(400, "Product ID is required"));
        // Find old product
        const oldProduct = await ProductModel_1.default.findById(id);
        if (!oldProduct)
            return next((0, http_errors_1.default)(404, "Product not found"));
        const updatedData = { ...body };
        if (body.status) {
            updatedData.status = body.status;
        }
        // ---- UPDATE PRODUCT ----
        const updatedProduct = await ProductModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product status updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateProductStatus = updateProductStatus;
