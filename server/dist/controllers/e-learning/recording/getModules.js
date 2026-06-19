"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const CourseOrderModel_1 = require("../../../models/CourseOrderModel");
const http_errors_1 = __importDefault(require("http-errors"));
const getModules = async (req, res, next) => {
    const { slug } = req.body;
    const course = await CourseModel_1.default.findOne({ slug });
    if (course) {
        const order = await CourseOrderModel_1.CourseOrderModel.findOne({
            "courses._id": course._id,
            customer: req?.user?._id
        });
        if (order) {
            res.status(200).json({
                success: true,
                modules: order?.modules || [],
                message: "All modules fetched successfully",
            });
        }
        else {
            return next((0, http_errors_1.default)(400, "Not found Order"));
        }
    }
    else {
        return next((0, http_errors_1.default)(400, "Not found course"));
    }
};
exports.default = getModules;
