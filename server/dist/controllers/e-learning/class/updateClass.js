"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClass = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const UserModel_1 = __importDefault(require("../../../models/UserModel"));
const getFilterClassBodyData_1 = require("../../../utils/getFilterClassBodyData");
const ClassModel_1 = __importDefault(require("../../../models/ClassModel"));
const updateClass = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Class ID is required"));
        const { audiosOne, audiosTwo, videosOne, videosTwo, thumbnail, attachment } = req.files;
        const body = (0, getFilterClassBodyData_1.getFilterClassBodyData)(req);
        const deletedImages = body.deletedImages
            ? JSON.parse(body.deletedImages)
            : [];
        const deletedAudiosOne = body.deletedAudiosOne
            ? JSON.parse(body.deletedAudiosOne)
            : [];
        const deletedAudiosTwo = body.deletedAudiosTwo
            ? JSON.parse(body.deletedAudiosTwo)
            : [];
        const deletedVideosOne = body.deletedVideosOne
            ? JSON.parse(body.deletedVideosOne)
            : [];
        const deletedVideosTwo = body.deletedVideosTwo
            ? JSON.parse(body.deletedVideosTwo)
            : [];
        // Find old class
        const oldClass = await ClassModel_1.default.findById(id);
        if (!oldClass)
            return next((0, http_errors_1.default)(404, "Class not found"));
        let slug;
        // If the title hasn't changed, keep the current slug
        if (body.title === oldClass.title && oldClass?.slug == body.slug) {
            slug = oldClass.slug;
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
            const duplicateCommunityCount = await ClassModel_1.default.countDocuments({
                slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
                _id: { $ne: oldClass._id },
            });
            if (duplicateCommunityCount > 0) {
                slug = `${slug}-${duplicateCommunityCount}`;
            }
        }
        const updatedData = { ...body, slug };
        // ---- AUDIOS ONE ----
        if (audiosOne?.length || deletedAudiosOne.length) {
            const newAudiosOne = audiosOne?.map((file) => file.filename) || [];
            updatedData.audiosOne = [
                ...oldClass.audiosOne.filter((audio) => !deletedAudiosOne.includes(audio)),
                ...newAudiosOne,
            ];
        }
        // ---- AUDIOS TWO ----
        if (audiosTwo?.length || deletedAudiosTwo.length) {
            const newAudiosTwo = audiosTwo?.map((file) => file.filename) || [];
            updatedData.audiosTwo = [
                ...oldClass.audiosTwo.filter((audio) => !deletedAudiosTwo.includes(audio)),
                ...newAudiosTwo,
            ];
        }
        // ---- VIDEOS ONE ----
        if (videosOne?.length || deletedVideosOne.length) {
            const newVideosOne = videosOne?.map((file) => file.filename) || [];
            updatedData.videosOne = [
                ...oldClass.videosOne.filter((video) => !deletedVideosOne.includes(video)),
                ...newVideosOne,
            ];
        }
        // ---- VIDEOS TWO ----
        if (videosTwo?.length || deletedVideosTwo.length) {
            const newVideosTwo = videosTwo?.map((file) => file.filename) || [];
            updatedData.videosTwo = [
                ...oldClass.videosTwo.filter((video) => !deletedVideosTwo.includes(video)),
                ...newVideosTwo,
            ];
        }
        // ---- THUMBNAIL ----
        if (thumbnail?.length) {
            updatedData.thumbnail = thumbnail[0].filename;
        }
        // ---- ATTACHMENT ----
        if (attachment?.length) {
            updatedData.attachment = attachment[0].filename;
        }
        // ---- UPDATE Class ----
        const updatedClass = await ClassModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedClass)
            return next((0, http_errors_1.default)(400, "Failed to update class"));
        // ---- DELETE OLD FILES ----
        const allOldFiles = [
            ...(oldClass.audiosOne || []),
            ...(oldClass.audiosTwo || []),
            ...(oldClass.videosOne || []),
            ...(oldClass.videosTwo || []),
            oldClass.thumbnail,
            oldClass.attachment,
        ].filter(Boolean);
        deletedImages.forEach((img) => {
            if (allOldFiles.includes(img)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(img, "classes");
            }
        });
        deletedAudiosOne.forEach((audio) => {
            if (allOldFiles.includes(audio)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(audio, "classes");
            }
        });
        deletedAudiosTwo.forEach((audio) => {
            if (allOldFiles.includes(audio)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(audio, "classes");
            }
        });
        deletedVideosOne.forEach((video) => {
            if (allOldFiles.includes(video)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(video, "classes");
            }
        });
        deletedVideosTwo.forEach((video) => {
            if (allOldFiles.includes(video)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(video, "classes");
            }
        });
        if (body.speaker !== oldClass.speaker) {
            await UserModel_1.default.updateOne({ classes: { $in: [oldClass._id] } }, { $pull: { classes: oldClass._id } });
            await UserModel_1.default.updateOne({ _id: body.speaker }, { $push: { classes: oldClass._id } });
        }
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedClass,
            message: "Class updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateClass = updateClass;
