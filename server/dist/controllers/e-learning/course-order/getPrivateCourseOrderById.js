"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateCourseOrderById = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const getPrivateCourseOrderById = async (req, res, next) => {
    try {
        console.log("the signle course work");
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Order ID is required"));
        const order = await CourseOrderModel_1.CourseOrderModel.findOne({ _id: id, customer: req.user?._id }).populate([
            {
                path: "courses._id", // populate course refs inside courses array
            },
            {
                path: "customer",
                select: "-password"
            }
        ]);
        if (!order) {
            return res.status(200).json({
                success: false,
                data: {},
                message: "Order Not Found",
            });
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
exports.getPrivateCourseOrderById = getPrivateCourseOrderById;
