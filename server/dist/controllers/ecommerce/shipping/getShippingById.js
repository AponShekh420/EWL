"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ShippingModel_1 = __importDefault(require("../../../models/ShippingModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getShippingById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Shipping ID is required"));
        const shipping = await ShippingModel_1.default.findById(id).populate(["creator"]);
        if (!shipping) {
            return next((0, http_errors_1.default)(404, `Shipping with id ${id} not found`));
        }
        res.status(200).json({
            success: true,
            data: shipping,
            message: "Shipping fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getShippingById = getShippingById;
