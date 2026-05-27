"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseOrder = void 0;
const dot_object_1 = __importDefault(require("dot-object"));
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const updateCourseOrder = async (req, res, next) => {
    const id = req.params?.id;
    const body = dot_object_1.default.object(req.body);
    try {
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        // Find old order
        const oldOrder = await CourseOrderModel_1.CourseOrderModel.findById(id);
        if (!oldOrder)
            return next((0, http_errors_1.default)(404, "Order not found"));
        const updatedData = { ...body };
        // ---- UPDATE ORDER ----
        const updatedOrder = await CourseOrderModel_1.CourseOrderModel.findByIdAndUpdate(id, updatedData, {
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
exports.updateCourseOrder = updateCourseOrder;
