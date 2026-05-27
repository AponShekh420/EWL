"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseBySlug = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const getCourseBySlug = async (req, res, next) => {
    try {
        const slug = req.params?.slug;
        if (!slug)
            return next((0, http_errors_1.default)(400, "Course slug is required"));
        const course = await CourseModel_1.default.findOne({ slug }).populate("speaker", "firstName lastName avatar _id userName");
        if (!course) {
            return next((0, http_errors_1.default)(400, "Not found course"));
        }
        return res.status(200).json({
            success: true,
            data: course,
            message: "Course fetched by slug successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getCourseBySlug = getCourseBySlug;
