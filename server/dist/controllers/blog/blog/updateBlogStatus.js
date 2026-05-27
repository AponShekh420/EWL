"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogStatus = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogModel_1 = __importDefault(require("../../../models/BlogModel"));
const updateBlogStatus = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const body = req.body;
        if (!id)
            return next((0, http_errors_1.default)(400, "Blog ID is required"));
        // Find old blog
        const oldBlog = await BlogModel_1.default.findById(id);
        if (!oldBlog)
            return next((0, http_errors_1.default)(404, "Blog not found"));
        const updatedData = { ...body };
        if (body.status) {
            updatedData.status = body.status;
        }
        // ---- UPDATE BLOG ----
        const updatedBlog = await BlogModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedBlog,
            message: "Blog status updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateBlogStatus = updateBlogStatus;
