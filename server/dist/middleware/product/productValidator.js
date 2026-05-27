"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateProduct = exports.validateProduct = exports.productValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.productValidationRules = [
    (0, express_validator_1.body)("creator").notEmpty().withMessage("Creator is required"),
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("tags")
        .optional(),
    (0, express_validator_1.body)("shortDescription")
        .notEmpty()
        .withMessage("Short description is required"),
    (0, express_validator_1.body)("description").optional(),
    (0, express_validator_1.body)("sku")
        .optional(),
    (0, express_validator_1.body)("isbn")
        .optional(),
    (0, express_validator_1.body)("regularPrice").optional(),
    (0, express_validator_1.body)("salePrice").isNumeric().withMessage("Sale price must be a number"),
    (0, express_validator_1.body)("stock").optional(),
    (0, express_validator_1.body)("stockStatus").optional(),
    (0, express_validator_1.body)("isVisibleProductPage")
        .isBoolean()
        .withMessage("isVisibleProductPage must be boolean"),
    (0, express_validator_1.body)("trackStockQuantity")
        .optional(),
    (0, express_validator_1.body)("limitOneItemPerOrder")
        .optional(),
    (0, express_validator_1.body)("weight").optional(),
    (0, express_validator_1.body)("declaredValue")
        .optional(),
    (0, express_validator_1.body)("dimensionLength")
        .optional(),
    (0, express_validator_1.body)("dimensionWidth").optional(),
    (0, express_validator_1.body)("dimensionHeight")
        .optional(),
    (0, express_validator_1.body)("taxStatus").optional(),
    (0, express_validator_1.body)("enelope").optional(),
    (0, express_validator_1.body)("customMessage").optional(),
    (0, express_validator_1.body)("checkoutPageMessage").optional(),
    (0, express_validator_1.body)("metaTitle").optional(),
    (0, express_validator_1.body)("metaDescription").optional(),
    (0, express_validator_1.body)("slug").optional(),
];
const validateProduct = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const { images, thumbnail, attachment } = req.files;
    if (!images?.length) {
        errors.images = {
            type: "field",
            msg: "Feature images is required",
            path: "images",
            location: "body",
        };
    }
    if (!thumbnail?.length) {
        errors.thumbnail = {
            type: "field",
            msg: "Thumbnail is required",
            path: "thumbnail",
            location: "body",
        };
    }
    // if (!attachment?.length) {
    //   errors.attachment = {
    //     type: "field",
    //     msg: "Attachment is required",
    //     path: "attachment",
    //     location: "body",
    //   };
    // }
    //Delete handler for uploaded files if has error
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "products");
            });
        }
    };
    if (Object.keys(errors).length > 0) {
        imageDeleteHandler();
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors,
        });
    }
    next();
};
exports.validateProduct = validateProduct;
const validateUpdateProduct = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "products");
            });
        }
    };
    if (Object.keys(errors).length > 0) {
        imageDeleteHandler();
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors,
        });
    }
    next();
};
exports.validateUpdateProduct = validateUpdateProduct;
