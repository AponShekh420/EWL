"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWishlist = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const WishlistModel_1 = require("../../../models/WishlistModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllWishlist = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const wishlist = await WishlistModel_1.WishlistModel.findOne({ customer: userId }).populate("items");
        if (!wishlist) {
            return next((0, http_errors_1.default)(400, "Not found carts"));
        }
        res.status(200).json({
            success: true,
            data: wishlist,
            message: "All wishlist fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllWishlist = getAllWishlist;
