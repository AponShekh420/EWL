"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = void 0;
const dot_object_1 = __importDefault(require("dot-object"));
const http_errors_1 = __importDefault(require("http-errors"));
const OrderModel_1 = require("../../../models/OrderModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateOrder = async (req, res, next) => {
    const id = req.params?.id;
    const body = dot_object_1.default.object(req.body);
    try {
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        // Find old order
        const oldOrder = await OrderModel_1.OrderModel.findById(id);
        if (!oldOrder)
            return next((0, http_errors_1.default)(404, "Order not found"));
        const updatedData = { ...body };
        // ---- UPDATE ORDER ----
        const updatedOrder = await OrderModel_1.OrderModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedOrder)
            return next((0, http_errors_1.default)(400, "Failed to update order"));
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedOrder,
            message: "Order updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateOrder = updateOrder;
