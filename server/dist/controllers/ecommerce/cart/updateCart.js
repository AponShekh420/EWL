"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCart = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CartModel_1 = require("../../../models/CartModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const updateCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req?.user?._id;
        if (quantity < 1) {
            return next((0, http_errors_1.default)(400, "Quantity must be at least 1"));
        }
        const cart = await CartModel_1.CartModel.findOne({ customer: userId });
        if (!cart) {
            return next((0, http_errors_1.default)(404, "Cart not found"));
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1) {
            return next((0, http_errors_1.default)(404, "Product not in cart"));
        }
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        return res.status(200).json({
            success: true,
            data: cart,
            message: "Cart updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateCart = updateCart;
