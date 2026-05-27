"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShipping = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ShippingModel_1 = __importDefault(require("../../../models/ShippingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const createShipping = async (req, res, next) => {
    try {
        const { zoneName, region, shippingMethods } = req.body;
        console.log(shippingMethods, zoneName);
        const userId = req.user?._id;
        const createdShipping = await ShippingModel_1.default.create({
            creator: userId,
            zoneName,
            region,
            shippingMethods,
        });
        if (!createdShipping) {
            return next((0, http_errors_1.default)(400, "Failed to add shipping"));
        }
        return res.status(201).json({
            success: true,
            data: createdShipping,
            message: "Shipping created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createShipping = createShipping;
