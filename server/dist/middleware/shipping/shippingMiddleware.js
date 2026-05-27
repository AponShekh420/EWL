"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateShipping = exports.shippingValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.shippingValidationRules = [
    (0, express_validator_1.body)("zoneName").notEmpty().withMessage("Zone name is required!"),
    (0, express_validator_1.body)("region").notEmpty().withMessage("Region is required!"),
    (0, express_validator_1.body)("shippingMethods")
        .notEmpty()
        .withMessage("Shipping methods is required")
        .custom((value) => {
        try {
            if (!Array.isArray(value)) {
                throw new Error("Must be an array");
            }
            if (value.length === 0) {
                throw new Error("Shipping methods cannot be empty");
            }
            return true;
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : "Invalid shipping methods");
        }
    }),
];
const validateShipping = (req, res, next) => {
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
exports.validateShipping = validateShipping;
