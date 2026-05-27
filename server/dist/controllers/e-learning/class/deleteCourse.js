"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const deleteCourse = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Course ID is required"));
        const deletedCourse = await CourseModel_1.default.findByIdAndDelete(id);
        if (!deletedCourse) {
            return next((0, http_errors_1.default)(404, `Course with id ${id} not found`));
        }
        (0, deleteFileFromLocal_1.deleteFileFromLocal)([
            deletedCourse.thumbnail,
            deletedCourse?.attachment,
        ].filter((file) => Boolean(file)), "courses");
        return res.status(200).json({
            success: true,
            status: 201,
            data: deletedCourse,
            message: `Course with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteCourse = deleteCourse;
