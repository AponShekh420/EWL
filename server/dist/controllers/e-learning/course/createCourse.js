"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const getFilterCourseBodyData_1 = require("../../../utils/getFilterCourseBodyData");
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const createCourse = async (req, res, next) => {
    try {
        const { thumbnail, attachment } = req.files;
        const body = (0, getFilterCourseBodyData_1.getFilterCourseBodyData)(req);
        // Remove special characters and make the slug
        const sanitizedTitle = body.metaTitle
            ? body.metaTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
            : body.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "");
        let slug = sanitizedTitle.split(" ").join("-");
        // Check for duplicates
        const duplicateCommunityCount = await CourseModel_1.default.countDocuments({
            slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateCommunityCount > 0) {
            slug = `${slug}-${duplicateCommunityCount}`;
        }
        const createdCourse = await CourseModel_1.default.create({
            ...body,
            slug,
            thumbnail: thumbnail[0].filename,
            attachment: attachment ? attachment[0]?.filename : "",
        });
        if (!createdCourse) {
            return next((0, http_errors_1.default)(400, "Failed to create course"));
        }
        await UserModel_1.default.findOneAndUpdate({ _id: createdCourse?.speaker }, { $push: { courses: createdCourse?._id } }, { new: true } // Optional: returns the updated document
        );
        return res.status(201).json({
            success: true,
            status: 201,
            data: createdCourse,
            message: "Course created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createCourse = createCourse;
