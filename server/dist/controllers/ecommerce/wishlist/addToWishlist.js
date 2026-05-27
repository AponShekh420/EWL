"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToWishlist = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const WishlistModel_1 = require("../../../models/WishlistModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const addToWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req?.user?._id;
        const product = await ProductModel_1.default.findById(productId);
        if (!product) {
            return next((0, http_errors_1.default)(400, "Product not found"));
        }
        let wishlist = await WishlistModel_1.WishlistModel.findOne({ customer: userId });
        if (!wishlist) {
            wishlist = new WishlistModel_1.WishlistModel({
                customer: userId,
                items: [productId],
            });
        }
        else {
            const itemIndex = wishlist.items.findIndex((item) => item.toString() === productId);
            if (itemIndex < 0) {
                wishlist.items.push(productId);
            }
        }
        await wishlist.save();
        return res.status(201).json({
            success: true,
            data: wishlist,
            message: "Product added to wishlist",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.addToWishlist = addToWishlist;
