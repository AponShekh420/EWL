"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassOrderById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const ClassOrderModel_1 = require("../../../models/ClassOrderModel");
const getClassOrderById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        const order = await ClassOrderModel_1.ClassOrderModel.findById(id).populate([
            {
                path: "classes._id", // populate class refs inside classes array
            },
            {
                path: "customer",
                select: "-password"
            }
        ]);
        if (!order) {
            return next((0, http_errors_1.default)(400, "Not found order"));
        }
        return res.status(200).json({
            success: true,
            data: order,
            message: "Order fetched by id successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getClassOrderById = getClassOrderById;
