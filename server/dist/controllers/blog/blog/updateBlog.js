"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const getFilterBodyData_1 = require("../../../utils/getFilterBodyData");
const BlogModel_1 = __importDefault(require("../../../models/BlogModel"));
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const updateBlog = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Blog ID is required"));
        const { images, thumbnail, attachment } = req.files;
        const body = (0, getFilterBodyData_1.getFilterBodyData)(req);
        const deletedImages = body.deletedImages
            ? JSON.parse(body.deletedImages)
            : [];
        // Find old blog
        const oldBlog = await BlogModel_1.default.findById(id);
        if (!oldBlog)
            return next((0, http_errors_1.default)(404, "Blog not found"));
        let slug;
        let metaSlug;
        // If the title hasn't changed, keep the current slug
        if (body.title === oldBlog.title && oldBlog?.slug == body.slug) {
            slug = oldBlog.slug;
        }
        else {
            // Remove special characters and generate slug
            const sanitizedTitle = body.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "");
            slug = sanitizedTitle.split(" ").join("-");
            // Check for duplicates excluding the current communtiy ID
            const duplicateBlogCount = await BlogModel_1.default.countDocuments({
                slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
                _id: { $ne: oldBlog._id },
            });
            if (duplicateBlogCount > 0) {
                slug = `${slug}-${duplicateBlogCount}`;
            }
        }
        // If the title hasn't changed, keep the current metaSlug
        if (body.metaTitle === oldBlog.metaTitle &&
            oldBlog?.metaSlug == body.metaSlug) {
            metaSlug = oldBlog.metaSlug;
            console.log(body.metaTitle, "old");
        }
        else {
            console.log(body.metaTitle);
            // Remove special characters and generate slug
            const sanitizedTitle = body.metaTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "");
            metaSlug = sanitizedTitle.split(" ").join("-");
            // Check for duplicates excluding the current communtiy ID
            const duplicateBlogCount = await BlogModel_1.default.countDocuments({
                metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
                _id: { $ne: oldBlog._id },
            });
            if (duplicateBlogCount > 0) {
                metaSlug = `${metaSlug}-${duplicateBlogCount}`;
            }
        }
        const updatedData = { ...body, slug, metaSlug };
        // ---- THUMBNAIL ----
        if (thumbnail?.length) {
            updatedData.thumbnail = thumbnail[0].filename;
        }
        // ---- UPDATE BLOG ----
        const updatedBlog = await BlogModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedBlog)
            return next((0, http_errors_1.default)(400, "Failed to update blog"));
        // ---- DELETE OLD FILES ----
        const allOldFiles = [
            oldBlog.thumbnail,
        ].filter(Boolean);
        deletedImages.forEach((img) => {
            if (allOldFiles.includes(img)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(img, "blogs");
            }
        });
        console.log("body category:", body.category);
        console.log("oldBlog category:", oldBlog.category);
        if (body.category !== oldBlog.category) {
            await BlogCategoryModel_1.BlogCategoryModel.updateOne({ blogs: { $in: [oldBlog._id] } }, // find category that HAS this blog
            { $pull: { blogs: oldBlog._id } } // remove from OLD category
            );
            await BlogCategoryModel_1.BlogCategoryModel.updateOne({ slug: { $regex: `^${body.category}$`, $options: "i" } }, { $push: { blogs: oldBlog._id } });
        }
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedBlog,
            message: "Blog updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateBlog = updateBlog;
