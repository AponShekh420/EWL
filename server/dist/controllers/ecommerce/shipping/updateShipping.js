"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShipping = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ShippingModel_1 = __importDefault(require("../../../models/ShippingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateShipping = async (req, res, next) => {
    const id = req.params?.id;
    const body = req.body;
    try {
        if (!id)
            return next((0, http_errors_1.default)(400, "Shipping ID is required"));
        // Find old order
        const oldShipping = await ShippingModel_1.default.findById(id);
        if (!oldShipping)
            return next((0, http_errors_1.default)(404, "Shipping not found"));
        const updatedData = { ...body };
        // ---- UPDATE Cart ----
        const updatedShipping = await ShippingModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedShipping)
            return next((0, http_errors_1.default)(400, "Failed to update shipping"));
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedShipping,
            message: "Shipping updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateShipping = updateShipping;
