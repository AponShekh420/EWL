"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResourceCategory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const createResourceCategory = async (req, res, next) => {
    const { name, description } = req.body;
    const file = req.file;
    if (!file) {
        return next((0, http_errors_1.default)(400, "Category thumbnail is missing!"));
    }
    const slug = name.replace(" ", "-").toLowerCase();
    const existingCategory = await ResourceCategory_1.ResourceCategoryModel.findOne({ slug: slug });
    if (existingCategory) {
        return next((0, http_errors_1.default)(409, "Category with this name already exists!"));
    }
    const category = await ResourceCategory_1.ResourceCategoryModel.create({
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
exports.createResourceCategory = createResourceCategory;
