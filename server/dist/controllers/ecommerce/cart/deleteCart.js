"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = void 0;
const mongoose_1 = require("mongoose");
const CartModel_1 = require("../../../models/CartModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteCart = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { productId } = req.params;
        console.log(productId);
        const cart = await CartModel_1.CartModel.findOne({ customer: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const initialLength = cart.items.length;
        const productObjectId = new mongoose_1.Types.ObjectId(productId);
        const item = cart.items.find((item) => item.product.equals(productObjectId));
        if (!item) {
            return res.status(404).json({ message: "Product not in cart" });
        }
        cart.items.pull(item._id);
        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: "Product not in cart" });
        }
        await cart.save();
        return res.status(200).json({
            success: true,
            data: exports.deleteCart,
            message: `Cart deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteCart = deleteCart;
