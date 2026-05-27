"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const checkForgetValidation = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email address or username is required")
        .trim(),
];
exports.default = checkForgetValidation;
