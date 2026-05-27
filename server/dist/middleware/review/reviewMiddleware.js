"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReview = exports.reviewUpdateValidationRules = exports.reviewValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.reviewValidationRules = [
    (0, express_validator_1.body)("productId")
        .isMongoId()
        .withMessage("ProductId must be a valid MongoDB ObjectId"),
    (0, express_validator_1.body)("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isNumeric()
        .withMessage("Rating is number"),
    (0, express_validator_1.body)("review").notEmpty().withMessage("Review is required!"),
];
exports.reviewUpdateValidationRules = [
    (0, express_validator_1.body)("productId").isMongoId().optional(),
    (0, express_validator_1.body)("rating").isNumeric().optional(),
    (0, express_validator_1.body)("review").optional(),
    (0, express_validator_1.body)("status").optional(),
];
const validateReview = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors,
        });
    }
    next();
};
exports.validateReview = validateReview;
