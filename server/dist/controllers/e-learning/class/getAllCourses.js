"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourses = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await CourseModel_1.default.find();
        if (!courses) {
            return next((0, http_errors_1.default)(400, "Not found courses"));
        }
        res.status(200).json({
            success: true,
            data: courses,
            message: "All Courses fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllCourses = getAllCourses;
