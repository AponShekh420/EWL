"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubcategory = exports.subcategoryValidationRules = void 0;
const express_validator_1 = require("express-validator");
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.subcategoryValidationRules = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Subcategory name is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Category ID must be a valid MongoDB ObjectId"),
];
const validateSubcategory = (req, res, next) => {
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
    next();
};
exports.validateSubcategory = validateSubcategory;
