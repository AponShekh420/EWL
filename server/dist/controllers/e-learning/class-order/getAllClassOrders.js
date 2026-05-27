"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllClassOrder = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const ClassOrderModel_1 = require("../../../models/ClassOrderModel");
const getAllClassOrder = async (req, res, next) => {
    const query = req.query;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    try {
        if (query.search) {
            const classes = await ClassModel_1.default
                .find({
                title: { $regex: query.search, $options: "i" },
            })
                .select("_id");
            if (classes.length > 0) {
                searchQuery = { class: { $in: classes.map((p) => p._id) } };
            }
        }
        const orders = await ClassOrderModel_1.ClassOrderModel.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate([
            {
                path: "classes._id", // populate class refs inside classes array
            },
            {
                path: "customer",
                select: "-password"
            }
        ]);
        if (!orders) {
            return next((0, http_errors_1.default)(400, "Not found orders"));
        }
        const total = await ClassOrderModel_1.ClassOrderModel.countDocuments();
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
exports.getAllClassOrder = getAllClassOrder;
