"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = exports.orderValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.orderValidationRules = [
    // -------------------------
    // Customer Info
    // -------------------------
    (0, express_validator_1.body)("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),
    (0, express_validator_1.body)("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),
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
    (0, express_validator_1.body)("totalProduct")
        .isNumeric()
        .withMessage("Total product is required"),
    (0, express_validator_1.body)("subtotal")
        .isNumeric()
        .withMessage("Subtotal must be numeric"),
    (0, express_validator_1.body)("tax")
        .optional()
        .isNumeric()
        .withMessage("Tax must be numeric"),
    (0, express_validator_1.body)("orderNotes")
        .optional()
        .isString(),
    // -------------------------
    // Products Array
    // -------------------------
    (0, express_validator_1.body)("products")
        .isArray({ min: 1 })
        .withMessage("At least one product required"),
    (0, express_validator_1.body)("products.*._id")
        .isMongoId()
        .withMessage("Invalid product id"),
    (0, express_validator_1.body)("products.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
    (0, express_validator_1.body)("products.*.price")
        .isFloat({ min: 0 })
        .withMessage("Price must be valid"),
    // -------------------------
    // Shipping Object
    // -------------------------
    (0, express_validator_1.body)("shipping.methodName")
        .optional()
        .isString(),
    (0, express_validator_1.body)("shipping.cost")
        .optional()
        .isFloat({ min: 0 }),
    (0, express_validator_1.body)("shipping.boxUsed")
        .optional()
        .isString(),
    (0, express_validator_1.body)("shipping.finalWeightOz")
        .optional()
        .isFloat({ min: 0 }),
    (0, express_validator_1.body)("shipping.servicelevel")
        .optional()
        .isString(),
    // -------------------------
    // Shipping Class Rates
    // -------------------------
    (0, express_validator_1.body)("shippingClassRates")
        .optional()
        .isArray(),
    (0, express_validator_1.body)("shippingClassRates.*._id")
        .optional()
        .isString(),
    (0, express_validator_1.body)("shippingClassRates.*.shippingCost")
        .optional()
        .isFloat({ min: 0 }),
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
    (0, express_validator_1.body)("isDifferentBillingAddress")
        .optional()
        .isBoolean(),
    (0, express_validator_1.body)("differentBillingAddress.firstName")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing first name required"),
    (0, express_validator_1.body)("differentBillingAddress.lastName")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing last name required"),
    (0, express_validator_1.body)("differentBillingAddress.email")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .isEmail()
        .withMessage("Billing email is invalid"),
    (0, express_validator_1.body)("differentBillingAddress.spouseName")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing spouse name required"),
    (0, express_validator_1.body)("differentBillingAddress.phoneNumber")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing phone number required"),
    (0, express_validator_1.body)("differentBillingAddress.country")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing country required"),
    (0, express_validator_1.body)("differentBillingAddress.state")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing state required"),
    (0, express_validator_1.body)("differentBillingAddress.city")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing city required"),
    (0, express_validator_1.body)("differentBillingAddress.zip")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing zip required"),
    (0, express_validator_1.body)("differentBillingAddress.streetAddress")
        .if((value, { req }) => req.body.isDifferentBillingAddress === true)
        .notEmpty()
        .withMessage("Billing street address required"),
];
const validateOrder = (req, res, next) => {
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
exports.validateOrder = validateOrder;
