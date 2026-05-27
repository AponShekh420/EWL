"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogCategory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const BlogCategoryModel_1 = require("../../../models/BlogCategoryModel");
const createBlogCategory = async (req, res, next) => {
    const { name, description } = req.body;
    const file = req.file;
    if (!file) {
        return next((0, http_errors_1.default)(400, "Category thumbnail is missing!"));
    }
    const slug = name.replace(" ", "-").toLowerCase();
    const existingCategory = await BlogCategoryModel_1.BlogCategoryModel.findOne({ slug: slug });
    if (existingCategory) {
        return next((0, http_errors_1.default)(409, "Category with this name already exists!"));
    }
    const category = await BlogCategoryModel_1.BlogCategoryModel.create({
        name: name,
        description: description,
        slug: slug,
        thumbnail: file.filename,
    });
    try {
        res.status(201).json({
            success: true,
            data: category,
            message: "Category created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createBlogCategory = createBlogCategory;
