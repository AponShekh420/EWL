"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const checkSignInValidation = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email address or username is required")
        .trim(),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage('Password is required')
        .trim()
];
exports.default = checkSignInValidation;
