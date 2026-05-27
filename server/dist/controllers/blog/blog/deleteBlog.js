"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const BlogModel_1 = __importDefault(require("../../../models/BlogModel"));
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const deleteBlog = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Blog ID is required"));
        const deletedBlog = await BlogModel_1.default.findByIdAndDelete(id);
        if (!deletedBlog) {
            return next((0, http_errors_1.default)(404, `Blog with id ${id} not found`));
        }
        if (deletedBlog.thumbnail) {
            (0, deleteFileFromLocal_1.deleteFileFromLocal)([
                deletedBlog.thumbnail,
            ], "blogs");
        }
        await BlogCategoryModel_1.BlogCategoryModel.findOneAndUpdate({ _id: deletedBlog.category }, { $pull: { blogs: deletedBlog._id } }, { new: true });
        return res.status(200).json({
            success: true,
            status: 201,
            data: deletedBlog,
            message: `Blog with id ${id} deleted successfully`,
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.deleteBlog = deleteBlog;
