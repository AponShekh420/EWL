"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const CategoryModel_1 = require("../../../models/CategoryModel");
const ProductModel_1 = __importDefault(require("../../../models/ProductModel"));
const catchErrorSend_1 = require("../../../utils/catchErrorSend");
const getFilterBodyData_1 = require("./../../../utils/getFilterBodyData");
const createProduct = async (req, res, next) => {
    try {
        const { images, thumbnail, attachment } = req.files;
        const body = (0, getFilterBodyData_1.getFilterBodyData)(req);
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
        const duplicateProductSlugCount = await ProductModel_1.default.countDocuments({
            slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateProductSlugCount > 0) {
            slug = `${slug}-${duplicateProductSlugCount}`;
        }
        const duplicateProductMetaSlugCount = await ProductModel_1.default.countDocuments({
            metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
        });
        if (duplicateProductMetaSlugCount > 0) {
            metaSlug = `${metaSlug}-${duplicateProductMetaSlugCount}`;
        }
        const createdProduct = await ProductModel_1.default.create({
            ...body,
            slug,
            metaSlug,
            thumbnail: thumbnail[0].filename,
            attachment: attachment && attachment.length > 0 ? attachment[0].filename : null,
            images: images.map((file) => file.filename),
        });
        if (!createdProduct) {
            return next((0, http_errors_1.default)(400, "Failed to create product"));
        }
        await CategoryModel_1.CategoryModel.findOneAndUpdate({ slug: { $regex: `^${createdProduct.category}$`, $options: "i" } }, { $push: { products: createdProduct._id } }, { new: true });
        return res.status(201).json({
            success: true,
            status: 201,
            data: createdProduct,
            message: "Product created successfully",
        });
    }
    catch (error) {
        (0, catchErrorSend_1.catchErrorSend)(next, error);
    }
};
exports.createProduct = createProduct;
