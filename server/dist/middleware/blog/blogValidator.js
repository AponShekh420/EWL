"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBlog = exports.validateBlog = exports.blogValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.blogValidationRules = [
    (0, express_validator_1.body)("creator").notEmpty().withMessage("Creator is required"),
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("tags")
        .optional(),
    (0, express_validator_1.body)("description").optional(),
    (0, express_validator_1.body)("metaTitle").optional(),
    (0, express_validator_1.body)("metaDescription").optional(),
    (0, express_validator_1.body)("slug").optional(),
];
const validateBlog = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const { images, thumbnail } = req.files;
    if (!thumbnail?.length) {
        errors.thumbnail = {
            type: "field",
            msg: "Thumbnail is required",
            path: "thumbnail",
            location: "body",
        };
    }
    //Delete handler for uploaded files if has error
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "blogs");
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
exports.validateBlog = validateBlog;
const validateUpdateBlog = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "blogs");
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
exports.validateUpdateBlog = validateUpdateBlog;
