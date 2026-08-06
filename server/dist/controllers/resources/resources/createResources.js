"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResources = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getFilterBlogBodyDatacopy_1 = require("../../../utils/getFilterBlogBodyDatacopy");
const createResources = async (req, res, next) => {
    try {
        const { thumbnail } = req.files;
        const body = (0, getFilterBlogBodyDatacopy_1.getFilterBlogBodyData)(req);
        // Remove special characters and make the slug
        const sanitizedTitle = body.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "");
        let slug = sanitizedTitle.split(" ").join("-");
        // Check for duplicates
        const duplicateBlogSlugCount = await ResourcesModel_1.default.countDocuments({
            slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateBlogSlugCount > 0) {
            slug = `${slug}-${duplicateBlogSlugCount}`;
        }
        const createdResources = await ResourcesModel_1.default.create({
            ...body,
            slug,
            thumbnail: thumbnail[0].filename,
        });
        if (!createdResources) {
            return next((0, http_errors_1.default)(400, "Failed to create Resources"));
        }
        await ResourceCategory_1.ResourceCategoryModel.findOneAndUpdate({ slug: { $regex: `^${createdResources.category}$`, $options: "i" } }, { $push: { resources: createdResources._id } }, { new: true });
        return res.status(201).json({
            success: true,
            status: 201,
            data: createdResources,
            message: "Resources created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createResources = createResources;
