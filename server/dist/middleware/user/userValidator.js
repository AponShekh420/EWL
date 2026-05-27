"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.profileUpdateValidationRules = exports.userUpdateValidationRules = exports.userValidationRules = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const deleteFileFromLocal_1 = require("../../utils/deleteFileFromLocal");
exports.userValidationRules = [
    // Username
    (0, express_validator_1.body)("userName")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .custom(async (userName) => {
        const user = await UserModel_1.default.findOne({ userName });
        if (user) {
            throw new Error("Username already exists");
        }
    })
        .trim(),
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
    (0, express_validator_1.body)("gender").notEmpty().withMessage("Gender is required").trim(),
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
exports.userUpdateValidationRules = [
    // Username
    (0, express_validator_1.body)("userName")
        .optional({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .custom(async (userName) => {
        const user = await UserModel_1.default.findOne({ userName });
        if (user?.userName === userName)
            return;
        if (user) {
            throw new Error("Username already exists");
        }
    })
        .trim(),
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
        if (user?.email === email)
            return;
        if (user) {
            throw new Error("Email already exists");
        }
    })
        .normalizeEmail(),
    // // Password
    // body("password")
    //   .isStrongPassword({
    //     minLength: 8,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //   })
    //   .optional()
    //   .withMessage(
    //     "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    //   ),
    // // Confirm Password
    // body("cpassword")
    //   .optional()
    //   .custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //       throw new Error("Passwords do not match");
    //     }
    //     return true;
    //   }),
    // Gender
    (0, express_validator_1.body)("gender").notEmpty().withMessage("Gender is required").trim(),
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
exports.profileUpdateValidationRules = [
    // Username
    (0, express_validator_1.body)("userName")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .custom(async (userName) => {
        const user = await UserModel_1.default.findOne({ userName });
        if (user?.userName === userName)
            return;
        if (user) {
            throw new Error("Username already exists");
        }
    }),
    // First Name
    (0, express_validator_1.body)("firstName")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("First name can contain only letters"),
    // Last Name
    (0, express_validator_1.body)("lastName")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Last name can contain only letters"),
    // Email
    (0, express_validator_1.body)("email")
        .optional({ checkFalsy: true })
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom(async (email) => {
        const user = await UserModel_1.default.findOne({ email });
        if (user?.email === email)
            return;
        if (user) {
            throw new Error("Email already exists");
        }
    }),
    // Password
    (0, express_validator_1.body)("password")
        .optional({ checkFalsy: true })
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
        .optional({ checkFalsy: true })
        .custom((value, { req }) => {
        if (req.body.password && value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    // Gender
    (0, express_validator_1.body)("gender")
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage("Gender is required"),
    // Is Orthodox Jew
    (0, express_validator_1.body)("isOrthodoxJew")
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage("Orthodox Jew status must be 'Yes' or 'No'"),
    // Marital Status
    (0, express_validator_1.body)("maritalStatus")
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage("Marital status is required"),
    // Keeps Mitzvos
    (0, express_validator_1.body)("keepsMitzvos")
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage("Keeps mitzvos must be 'Yes' or 'No'"),
    // Chafifa Duration
    (0, express_validator_1.body)("chafifaDuration")
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage("Chafifa duration is required"),
    // Chicken Soup in Dairy Sink
    (0, express_validator_1.body)("chickenSoupInDairySink")
        .optional({ checkFalsy: true })
        .trim()
        .notEmpty()
        .withMessage("Please select an option for chicken soup in dairy sink"),
    (0, express_validator_1.body)("oldPassword")
        .optional({ checkFalsy: true })
        .custom(async (oldPassword, { req }) => {
        // If newPassword exists, oldPassword must exist
        if (req.body.newPassword && !oldPassword) {
            throw new Error("Old password is required");
        }
        // If oldPassword provided, verify it
        if (oldPassword) {
            const user = await UserModel_1.default.findById(req.body.userId).select("password");
            if (!user)
                throw new Error("User not found");
            const isMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
            if (!isMatch) {
                throw new Error("Old password is incorrect");
            }
        }
        return true;
    }),
    /* ---------- NEW PASSWORD ---------- */
    (0, express_validator_1.body)("newPassword")
        .optional({ checkFalsy: true })
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage("New password must be at least 8 characters long and include uppercase, lowercase, number, and symbol")
        .custom((newPassword, { req }) => {
        if (req.body.oldPassword && newPassword === req.body.oldPassword) {
            throw new Error("New password must be different from old password");
        }
        return true;
    }),
];
const validateUser = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).mapped();
    const file = req.file;
    if (Object.keys(errors).length > 0 && file) {
        (0, deleteFileFromLocal_1.deleteFileFromLocal)(file.filename, "profile");
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors,
        });
    }
    next();
};
exports.validateUser = validateUser;
