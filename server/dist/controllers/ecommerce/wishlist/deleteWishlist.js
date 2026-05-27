"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlist = void 0;
const mongoose_1 = require("mongoose");
const WishlistModel_1 = require("../../../models/WishlistModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteWishlist = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { productId } = req.params;
        const wishlist = await WishlistModel_1.WishlistModel.findOne({ customer: userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        const initialLength = wishlist.items.length;
        const productObjectId = new mongoose_1.Types.ObjectId(productId);
        const itemExists = wishlist.items.some((item) => item.equals(productObjectId));
        if (!itemExists) {
            return res.status(404).json({ message: "Product not in wishlist" });
        }
        wishlist.items = wishlist.items.filter((item) => !item.equals(productObjectId));
        if (wishlist.items.length === initialLength) {
            return res.status(404).json({ message: "Product not in cart" });
        }
        await wishlist.save();
        return res.status(200).json({
            success: true,
            data: wishlist,
            message: `Wishlist deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteWishlist = deleteWishlist;
