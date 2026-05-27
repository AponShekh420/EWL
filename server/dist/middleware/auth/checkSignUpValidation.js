"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const checkSignUpValidation = [
    // Username
    (0, express_validator_1.body)("userName")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .matches(/^[a-z0-9]+$/)
        .withMessage("Username can contain only lowercase letters (a-z) and numbers (0-9)")
        .custom(async (userName) => {
        const user = await UserModel_1.default.findOne({ userName });
        if (user) {
            throw new Error("Username already exists");
        }
    }),
    // First Name
    (0, express_validator_1.body)("firstName")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("First name can contain only letters")
        .trim(),
    // Last Name
    (0, express_validator_1.body)("lastName")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Last name can contain only letters")
        .trim(),
    // Email
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom(async (email) => {
        const user = await UserModel_1.default.findOne({ email });
        if (user) {
            throw new Error("Email already exists");
        }
    })
        .normalizeEmail(),
    // Password
    (0, express_validator_1.body)("password")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"),
    // Confirm Password
    (0, express_validator_1.body)("cpassword")
        .notEmpty()
        .withMessage("Confirm password is required")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    // Gender
    (0, express_validator_1.body)("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .trim(),
    // Is Orthodox Jew
    (0, express_validator_1.body)("isOrthodoxJew")
        .notEmpty()
        .withMessage("Orthodox Jew status must be 'Yes' or 'No'")
        .trim(),
    // Marital Status
    (0, express_validator_1.body)("maritalStatus")
        .notEmpty()
        .withMessage("Marital status is required")
        .trim(),
    // Keeps Mitzvos
    (0, express_validator_1.body)("keepsMitzvos")
        .notEmpty()
        .withMessage("Keeps mitzvos must be 'Yes' or 'No'")
        .trim(),
    // Chafifa Duration
    (0, express_validator_1.body)("chafifaDuration")
        .notEmpty()
        .withMessage("Chafifa duration is required")
        .trim(),
    // Chicken Soup in Dairy Sink
    (0, express_validator_1.body)("chickenSoupInDairySink")
        .notEmpty()
        .withMessage("Please select an option for chicken soup in dairy sink")
        .trim(),
];
exports.default = checkSignUpValidation;
