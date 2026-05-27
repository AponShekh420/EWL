"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseOrderById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const getCourseOrderById = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        const order = await CourseOrderModel_1.CourseOrderModel.findById(id).populate([
            {
                path: "courses._id", // populate course refs inside courses array
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
exports.getCourseOrderById = getCourseOrderById;
