"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const OrderModel_1 = require("../../../models/OrderModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteOrder = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        const deletedOrder = await OrderModel_1.OrderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            return next((0, http_errors_1.default)(404, `Order with id ${id} not found`));
        }
        return res.status(200).json({
            success: true,
            data: deletedOrder,
            message: `Order with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteOrder = deleteOrder;
