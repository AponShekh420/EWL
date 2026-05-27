"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPrivateOrder = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const OrderModel_1 = require("../../../models/OrderModel");
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllPrivateOrder = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    try {
        // Always filter by customer
        let searchQuery = { customer: req.user?._id };
        if (query.search) {
            const products = await ProductModel_1.default
                .find({
                title: { $regex: query.search, $options: "i" },
            })
                .select("_id");
            if (products.length > 0) {
                searchQuery["products._id"] = { $in: products.map((p) => p._id) };
            }
            else {
                // No matching products → return empty result immediately
                return res.json({ orders: [], total: 0 });
            }
        }
        const orders = await OrderModel_1.OrderModel.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate([
            {
                path: "products._id", // populate product refs inside products array
            },
            {
                path: "customer",
                select: "-password"
            }
        ]);
        if (!orders) {
            return next((0, http_errors_1.default)(400, "Not found orders"));
        }
        const total = await OrderModel_1.OrderModel.countDocuments();
        res.status(200).json({
            success: true,
            data: orders,
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
            message: "All orders fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllPrivateOrder = getAllPrivateOrder;
