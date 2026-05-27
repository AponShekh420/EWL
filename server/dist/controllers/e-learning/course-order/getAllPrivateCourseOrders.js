"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPrivateCourseOrder = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const OrderModel_1 = require("../../../models/OrderModel");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const getAllPrivateCourseOrder = async (req, res, next) => {
    console.log("couseeee");
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    try {
        // Always filter by customer
        let searchQuery = { customer: req.user?._id };
        if (query.search) {
            const courses = await CourseModel_1.default
                .find({
                title: { $regex: query.search, $options: "i" },
            })
                .select("_id");
            if (courses.length > 0) {
                searchQuery["courses._id"] = { $in: courses.map((p) => p._id) };
            }
            else {
                // No matching courses → return empty result immediately
                return res.json({ orders: [], total: 0 });
            }
        }
        const orders = await CourseOrderModel_1.CourseOrderModel.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate([
            {
                path: "courses._id", // populate course refs inside courses array
                populate: {
                    path: "speaker",
                    select: "firstName lastName avatar userName _id"
                }
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
exports.getAllPrivateCourseOrder = getAllPrivateCourseOrder;
