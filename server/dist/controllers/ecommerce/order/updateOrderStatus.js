"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const OrderModel_1 = require("../../../models/OrderModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateOrderStatus = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        // Find old product
        const oldProduct = await OrderModel_1.OrderModel.findById(id);
        if (!oldProduct)
            return next((0, http_errors_1.default)(404, "Order not found"));
        const { status } = req.body;
        if (!status)
            return next((0, http_errors_1.default)(400, "Status is required"));
        const updatedData = { ...req.body };
        // ---- UPDATE PRODUCT ----
        const updatedProduct = await OrderModel_1.OrderModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Order status updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateOrderStatus = updateOrderStatus;
