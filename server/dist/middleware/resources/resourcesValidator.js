"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateResources = exports.validateResources = exports.resourcesValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.resourcesValidationRules = [
    (0, express_validator_1.body)("creator").notEmpty().withMessage("Creator is required"),
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("description").optional(),
    (0, express_validator_1.body)("slug").optional(),
];
const validateResources = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const { thumbnail } = req.files;
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
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "resources");
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
exports.validateResources = validateResources;
const validateUpdateResources = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "resources");
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
exports.validateUpdateResources = validateUpdateResources;
