"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClassOrder = exports.classOrderValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.classOrderValidationRules = [
    // -------------------------
    // Customer Info
    // -------------------------
    (0, express_validator_1.body)("fullName")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required")
        .normalizeEmail(),
    (0, express_validator_1.body)("spouseName")
        .trim()
        .notEmpty()
        .withMessage("Spouse name is required"),
    (0, express_validator_1.body)("howDidYouHearAboutUs")
        .trim()
        .notEmpty()
        .withMessage("How did you hear about us is required"),
    (0, express_validator_1.body)("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),
    (0, express_validator_1.body)("otherPhoneNumber")
        .optional({ nullable: true, checkFalsy: true })
        .isString(),
    (0, express_validator_1.body)("country")
        .notEmpty()
        .withMessage("Country is required"),
    (0, express_validator_1.body)("state")
        .notEmpty()
        .withMessage("State is required"),
    (0, express_validator_1.body)("city")
        .notEmpty()
        .withMessage("City is required"),
    (0, express_validator_1.body)("zip")
        .trim()
        .notEmpty()
        .withMessage("Zip is required"),
    (0, express_validator_1.body)("streetAddress")
        .trim()
        .notEmpty()
        .withMessage("Street address is required"),
    (0, express_validator_1.body)("apartment")
        .optional()
        .isString(),
    // -------------------------
    // Order Info
    // -------------------------
    (0, express_validator_1.body)("totalClass")
        .isNumeric()
        .withMessage("Total Class is required"),
    (0, express_validator_1.body)("subtotal")
        .isNumeric()
        .withMessage("Subtotal must be numeric"),
    (0, express_validator_1.body)("orderNotes")
        .optional()
        .isString(),
    // -------------------------
    // Products Array
    // -------------------------
    (0, express_validator_1.body)("classes")
        .isArray({ min: 1 })
        .withMessage("At least one class required"),
    (0, express_validator_1.body)("classes.*._id")
        .isMongoId()
        .withMessage("Invalid class id"),
    (0, express_validator_1.body)("classes.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
    (0, express_validator_1.body)("classes.*.price")
        .isFloat({ min: 0 })
        .withMessage("Price must be valid"),
    // -------------------------
    // Status Validation
    // -------------------------
    (0, express_validator_1.body)("paymentStatus")
        .optional()
        .isIn([
        "pending",
        "paid",
        "failed",
        "refunded"
    ]),
    (0, express_validator_1.body)("status")
        .optional()
        .isIn([
        "pending",
        "completed",
        "cancelled",
        "refunded",
        "processing",
        "Failed"
    ]),
    // -------------------------
    // Different Billing Address
    // only validate if enabled
    // -------------------------
];
const validateClassOrder = (req, res, next) => {
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
exports.validateClassOrder = validateClassOrder;
