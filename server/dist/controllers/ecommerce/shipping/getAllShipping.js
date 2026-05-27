"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllShipping = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ShippingModel_1 = __importDefault(require("../../../models/ShippingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getAllShipping = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    try {
        if (query.search) {
            searchQuery = { zoneName: { $regex: query.search, $options: "i" } };
        }
        const shippings = await ShippingModel_1.default.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate(["creator"]);
        if (!shippings) {
            return next((0, http_errors_1.default)(400, "Not found shipping"));
        }
        const total = await ShippingModel_1.default.countDocuments();
        res.status(200).json({
            success: true,
            data: shippings,
            message: "All shipping fetched successfully",
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllShipping = getAllShipping;
