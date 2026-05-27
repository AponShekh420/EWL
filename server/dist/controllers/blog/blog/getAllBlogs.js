"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogs = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogModel_1 = __importDefault(require("../../../models/BlogModel"));
const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogModel_1.default.find();
        if (!blogs) {
            return next((0, http_errors_1.default)(400, "Not found blogs"));
        }
        res.status(200).json({
            success: true,
            data: blogs,
            message: "All Blogs fetched successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.getAllBlogs = getAllBlogs;
