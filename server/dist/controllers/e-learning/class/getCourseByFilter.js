"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByFilter = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const getCourseByFilter = async (req, res, next) => {
    try {
        const query = req.query;
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const skip = (page - 1) * limit;
        const searchQuery = {};
        query.category && (searchQuery.category = query.category);
        query.speaker && (searchQuery.speaker = query.speaker);
        query.status && (searchQuery.status = query.status);
        if (query.search) {
            searchQuery.$or = [
                { title: { $regex: query.search, $options: "i" } },
            ];
        }
        const courses = await CourseModel_1.default
            .find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("speaker", "-passwordResetExpires -passwordResetToken -password -isOrthodoxJew -maritalStatus -keepsMitzvos -chafifaDuration -chickenSoupInDairySink");
        if (!courses) {
            return next((0, http_errors_1.default)(400, "Not found courses"));
        }
        const total = courses.length;
        res.status(200).json({
            success: true,
            data: courses,
            pagination: {
                page: page,
                limit: limit,
                total: total,
                totalPages: Math.ceil(total / limit),
            },
            message: "All Courses fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getCourseByFilter = getCourseByFilter;
