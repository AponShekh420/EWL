"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const CourseModel_1 = __importDefault(require("../../../models/CourseModel"));
const getFilterCourseBodyData_1 = require("../../../utils/getFilterCourseBodyData");
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const updateCourse = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Course ID is required"));
        const { thumbnail, attachment } = req.files;
        const body = (0, getFilterCourseBodyData_1.getFilterCourseBodyData)(req);
        const deletedImages = body.deletedImages
            ? JSON.parse(body.deletedImages)
            : [];
        // Find old course
        const oldCourse = await CourseModel_1.default.findById(id);
        if (!oldCourse)
            return next((0, http_errors_1.default)(404, "Course not found"));
        let slug;
        // If the title hasn't changed, keep the current slug
        if (body.title === oldCourse.title && oldCourse?.slug == body.slug) {
            slug = oldCourse.slug;
        }
        else {
            // Remove special characters and generate slug
            const sanitizedTitle = body.metaTitle
                ? body.metaTitle
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                : body.title
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "");
            slug = sanitizedTitle.split(" ").join("-");
            // Check for duplicates excluding the current communtiy ID
            const duplicateCommunityCount = await CourseModel_1.default.countDocuments({
                slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
                _id: { $ne: oldCourse._id },
            });
            if (duplicateCommunityCount > 0) {
                slug = `${slug}-${duplicateCommunityCount}`;
            }
        }
        const updatedData = { ...body, slug };
        // ---- THUMBNAIL ----
        if (thumbnail?.length) {
            updatedData.thumbnail = thumbnail[0].filename;
        }
        // ---- ATTACHMENT ----
        if (attachment?.length) {
            updatedData.attachment = attachment[0].filename;
        }
        // ---- UPDATE Course ----
        const updatedCourse = await CourseModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedCourse)
            return next((0, http_errors_1.default)(400, "Failed to update course"));
        // ---- DELETE OLD FILES ----
        const allOldFiles = [
            oldCourse.thumbnail,
            oldCourse.attachment,
        ].filter(Boolean);
        deletedImages.forEach((img) => {
            if (allOldFiles.includes(img)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(img, "courses");
            }
        });
        if (body.speaker !== oldCourse.speaker) {
            await UserModel_1.default.updateOne({ courses: oldCourse._id }, { $pull: { courses: oldCourse._id } });
            await UserModel_1.default.updateOne({ _id: body.speaker }, { $addToSet: { courses: oldCourse._id } });
        }
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Course updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateCourse = updateCourse;
