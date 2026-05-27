"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaidHotlineSpeaker = exports.paidHotlineSpeakerRules = void 0;
const express_validator_1 = require("express-validator");
exports.paidHotlineSpeakerRules = [
    (0, express_validator_1.body)("fullname").notEmpty().withMessage("Fullname is required"),
    (0, express_validator_1.body)("speciality").notEmpty().withMessage("Speciality is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("gender").optional().isIn(["male", "female"]),
];
const validatePaidHotlineSpeaker = (req, res, next) => {
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
exports.validatePaidHotlineSpeaker = validatePaidHotlineSpeaker;
