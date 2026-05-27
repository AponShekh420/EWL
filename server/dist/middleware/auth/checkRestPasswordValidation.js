"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const checkRestPasswordValidation = [
    (0, express_validator_1.body)('password')
        .isStrongPassword()
        .withMessage('Password must be at 8 charactor long & should contain at least 3 lowercase, 3 uppercase, 3 number, & 3 symbol')
        .trim(),
];
exports.default = checkRestPasswordValidation;
