"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CartModel_1 = require("../../../models/CartModel");
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req?.user?._id;
        const product = (await ProductModel_1.default.findById(productId));
        if (!product) {
            return next((0, http_errors_1.default)(400, "Product not found"));
        }
        let cart = await CartModel_1.CartModel.findOne({ customer: userId });
        if (!cart) {
            cart = new CartModel_1.CartModel({
                customer: userId,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1,
                        price: product.salePrice,
                    },
                ],
            });
        }
        else {
            const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            }
            else {
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1,
                    price: product.salePrice,
                });
            }
        }
        await cart.save();
        return res.status(201).json({
            success: true,
            data: cart,
            message: "Product added to cart",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.addToCart = addToCart;
