"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProduct = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllProduct = async (req, res, next) => {
    try {
        const products = await ProductModel_1.default.find();
        if (!products) {
            return next((0, http_errors_1.default)(400, "Not found products"));
        }
        res.status(200).json({
            success: true,
            data: products,
            message: "All Product fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllProduct = getAllProduct;
