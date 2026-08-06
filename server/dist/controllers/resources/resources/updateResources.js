"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResources = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ResourceCategory_1 = require("../../../models/ResourceCategory");
const ResourcesModel_1 = __importDefault(require("../../../models/ResourcesModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const deleteFileFromLocal_1 = require("../../../utils/deleteFileFromLocal");
const getFilterBodyData_1 = require("../../../utils/getFilterBodyData");
const updateResources = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id)
            return next((0, http_errors_1.default)(400, "Resources ID is required"));
        const { thumbnail } = req.files;
        const body = (0, getFilterBodyData_1.getFilterBodyData)(req);
        const deletedImages = body.deletedImages
            ? JSON.parse(body.deletedImages)
            : [];
        // Find old blog
        const oldResources = await ResourcesModel_1.default.findById(id);
        if (!oldResources)
            return next((0, http_errors_1.default)(404, "Resources not found"));
        let slug;
        // If the title hasn't changed, keep the current slug
        if (body.title === oldResources.title && oldResources?.slug == body.slug) {
            slug = oldResources.slug;
        }
        else {
            // Remove special characters and generate slug
            const sanitizedTitle = body.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "");
            slug = sanitizedTitle.split(" ").join("-");
            // Check for duplicates excluding the current communtiy ID
            const duplicateResourcesCount = await ResourcesModel_1.default.countDocuments({
                slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
                _id: { $ne: oldResources._id },
            });
            if (duplicateResourcesCount > 0) {
                slug = `${slug}-${duplicateResourcesCount}`;
            }
        }
        const updatedData = { ...body, slug };
        // ---- THUMBNAIL ----
        if (thumbnail?.length) {
            updatedData.thumbnail = thumbnail[0].filename;
        }
        // ---- UPDATE BLOG ----
        const updatedResources = await ResourcesModel_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedResources)
            return next((0, http_errors_1.default)(400, "Failed to update Resources"));
        // ---- DELETE OLD FILES ----
        const allOldFiles = [oldResources.thumbnail].filter(Boolean);
        deletedImages.forEach((img) => {
            if (allOldFiles.includes(img)) {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(img, "resources");
            }
        });
        console.log("body category:", body.category);
        console.log("oldResources category:", oldResources.category);
        if (body.category !== oldResources.category) {
            await ResourceCategory_1.ResourceCategoryModel.updateOne({ resources: { $in: [oldResources._id] } }, // find category that HAS this blog
            { $pull: { blogs: oldResources._id } });
            await ResourceCategory_1.ResourceCategoryModel.updateOne({ slug: { $regex: `^${body.category}$`, $options: "i" } }, { $push: { resources: oldResources._id } });
        }
        // ---- RESPONSE ----
        return res.status(200).json({
            success: true,
            data: updatedResources,
            message: "Resources updated successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.updateResources = updateResources;
