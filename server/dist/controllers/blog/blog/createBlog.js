"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogModel_1 = __importDefault(require("../../../models/BlogModel"));
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const getFilterBlogBodyDatacopy_1 = require("../../../utils/getFilterBlogBodyDatacopy");
const createBlog = async (req, res, next) => {
    try {
        console.log("Creating blog with data:", req.body);
        const { thumbnail } = req.files;
        const body = (0, getFilterBlogBodyDatacopy_1.getFilterBlogBodyData)(req);
        // Remove special characters and make the slug
        const sanitizedTitle = body.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "");
        const sanitizedMetaTitle = body.metaTitle
            ? body.metaTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
            : body.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "");
        let metaSlug = sanitizedMetaTitle.split(" ").join("-");
        let slug = sanitizedTitle.split(" ").join("-");
        // Check for duplicates
        const duplicateBlogSlugCount = await BlogModel_1.default.countDocuments({
            slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateBlogSlugCount > 0) {
            slug = `${slug}-${duplicateBlogSlugCount}`;
        }
        const duplicateBlogMetaSlugCount = await BlogModel_1.default.countDocuments({
            metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateBlogMetaSlugCount > 0) {
            metaSlug = `${metaSlug}-${duplicateBlogMetaSlugCount}`;
        }
        const createdBlog = await BlogModel_1.default.create({
            ...body,
            slug,
            metaSlug,
            thumbnail: thumbnail[0].filename,
        });
        if (!createdBlog) {
            return next((0, http_errors_1.default)(400, "Failed to create blog"));
        }
        await BlogCategoryModel_1.BlogCategoryModel.findOneAndUpdate({ slug: { $regex: `^${createdBlog.category}$`, $options: "i" } }, { $push: { blogs: createdBlog._id } }, { new: true });
        return res.status(201).json({
            success: true,
            status: 201,
            data: createdBlog,
            message: "Blog created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createBlog = createBlog;
