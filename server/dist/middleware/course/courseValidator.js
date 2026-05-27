"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateCourse = exports.validateCourse = exports.courseValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.courseValidationRules = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("price").isNumeric().withMessage("Price must be a number"),
    (0, express_validator_1.body)("speaker").notEmpty().withMessage("Speaker is required"),
    (0, express_validator_1.body)("status").notEmpty().withMessage("Status is required"),
    (0, express_validator_1.body)("offline")
        .optional()
        .isIn(["true", "false"])
        .withMessage("Invalid offline value"),
    (0, express_validator_1.body)("externalLink")
        .if((value, { req }) => req.body.offline === "true")
        .notEmpty()
        .withMessage("External Link is required when offline is true")
        .isURL()
        .withMessage("External Link must be a valid URL"),
    (0, express_validator_1.body)("metaTitle").optional(),
    (0, express_validator_1.body)("metaDescription").optional(),
    (0, express_validator_1.body)("slug").optional(),
];
const validateCourse = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const { thumbnail, attachment } = req.files;
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
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "courses");
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
exports.validateCourse = validateCourse;
const validateUpdateCourse = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const imageDeleteHandler = () => {
        if (req.files) {
            const files = Object.values(req.files).flat();
            files.forEach((file) => {
                (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "courses");
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
exports.validateUpdateCourse = validateUpdateCourse;
