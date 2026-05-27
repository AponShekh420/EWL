"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogBySlug = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogModel_1 = __importDefault(require("../../../models/BlogModel"));
const getBlogBySlug = async (req, res, next) => {
    try {
        const slug = req.params?.slug;
        if (!slug)
            return next((0, http_errors_1.default)(400, "Blog slug is required"));
        const blog = await BlogModel_1.default.findOne({ slug }).populate("creator", "firstName lastName userName email avatar");
        if (!blog) {
            return next((0, http_errors_1.default)(400, "Not found blog"));
        }
        return res.status(200).json({
            success: true,
            data: blog,
            message: "Blog fetched by slug successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getBlogBySlug = getBlogBySlug;
