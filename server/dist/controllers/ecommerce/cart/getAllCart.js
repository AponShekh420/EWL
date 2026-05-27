"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCart = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CartModel_1 = require("../../../models/CartModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllCart = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const cart = await CartModel_1.CartModel.findOne({ customer: userId }).populate("items.product");
        if (!cart) {
            return next((0, http_errors_1.default)(400, "Not found carts"));
        }
        res.status(200).json({
            success: true,
            data: cart,
            message: "All cart list fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllCart = getAllCart;
