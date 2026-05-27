"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItems = void 0;
const CartModel_1 = require("../../../models/CartModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteCartItems = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const cart = await CartModel_1.CartModel.deleteOne({ customer: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        else {
            return res.status(200).json({
                success: true,
                data: cart,
                message: `Cart deleted successfully`,
            });
        }
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteCartItems = deleteCartItems;
