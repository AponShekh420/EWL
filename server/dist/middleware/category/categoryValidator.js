"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = exports.categoryValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.categoryValidationRules = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Category name is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
];
const validateCategory = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const file = req.file;
    if (!file) {
        errors.thumbnail = {
            type: "field",
            msg: "thumbnail is required",
            path: "thumbnail",
            location: "body",
        };
    }
    //Delete handler for uploaded files if has error
    const imageDeleteHandler = () => {
        (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "category");
    };
    if (Object.keys(errors).length > 0) {
        file && imageDeleteHandler();
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors,
        });
    }
    console.log(errors);
    next();
};
exports.validateCategory = validateCategory;
