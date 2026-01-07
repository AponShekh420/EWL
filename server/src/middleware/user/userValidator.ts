import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import UserModel from "../../models/UserModel";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const userValidationRules = [
  // Username
  body("userName")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (userName: string) => {
      const user = await UserModel.findOne({ userName });
      if (user) {
        throw new Error("Username already exists");
      }
    })
    .trim(),

  // First Name
  body("firstName")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("First name can contain only letters")
    .trim(),

  // Last Name
  body("lastName")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last name can contain only letters")
    .trim(),

  // Email
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (email: string) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("Email already exists");
      }
    })
    .normalizeEmail(),

  // Password
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    ),

  // Confirm Password
  body("cpassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // Gender
  body("gender").notEmpty().withMessage("Gender is required").trim(),

  // Is Orthodox Jew
  body("isOrthodoxJew")
    .notEmpty()
    .withMessage("Orthodox Jew status must be 'Yes' or 'No'")
    .trim(),

  // Marital Status
  body("maritalStatus")
    .notEmpty()
    .withMessage("Marital status is required")
    .trim(),

  // Keeps Mitzvos
  body("keepsMitzvos")
    .notEmpty()
    .withMessage("Keeps mitzvos must be 'Yes' or 'No'")
    .trim(),

  // Chafifa Duration
  body("chafifaDuration")
    .notEmpty()
    .withMessage("Chafifa duration is required")
    .trim(),

  // Chicken Soup in Dairy Sink
  body("chickenSoupInDairySink")
    .notEmpty()
    .withMessage("Please select an option for chicken soup in dairy sink")
    .trim(),
];
export const userUpdateValidationRules = [
  // Username
  body("userName")
    .optional({ checkFalsy: true })
    .isLength({ min: 3 })

    .withMessage("Username must be at least 3 characters long")
    .custom(async (userName: string) => {
      const user = await UserModel.findOne({ userName });
      if (user?.userName === userName) return;
      if (user) {
        throw new Error("Username already exists");
      }
    })
    .trim(),

  // First Name
  body("firstName")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("First name can contain only letters")
    .trim(),

  // Last Name
  body("lastName")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last name can contain only letters")
    .trim(),

  // Email
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (email: string) => {
      const user = await UserModel.findOne({ email });
      if (user?.email === email) return;
      if (user) {
        throw new Error("Email already exists");
      }
    })
    .normalizeEmail(),

  // Password
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .optional()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    ),

  // Confirm Password
  body("cpassword")
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // Gender
  body("gender").notEmpty().withMessage("Gender is required").trim(),

  // Is Orthodox Jew
  body("isOrthodoxJew")
    .notEmpty()
    .withMessage("Orthodox Jew status must be 'Yes' or 'No'")
    .trim(),

  // Marital Status
  body("maritalStatus")
    .notEmpty()
    .withMessage("Marital status is required")
    .trim(),

  // Keeps Mitzvos
  body("keepsMitzvos")
    .notEmpty()
    .withMessage("Keeps mitzvos must be 'Yes' or 'No'")
    .trim(),

  // Chafifa Duration
  body("chafifaDuration")
    .notEmpty()
    .withMessage("Chafifa duration is required")
    .trim(),

  // Chicken Soup in Dairy Sink
  body("chickenSoupInDairySink")
    .notEmpty()
    .withMessage("Please select an option for chicken soup in dairy sink")
    .trim(),
];

export const profileUpdateValidationRules = [
  // Username
  body("userName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (userName: string) => {
      const user = await UserModel.findOne({ userName });
      if (user?.userName === userName) return;
      if (user) {
        throw new Error("Username already exists");
      }
    }),

  // First Name
  body("firstName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("First name can contain only letters"),

  // Last Name
  body("lastName")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last name can contain only letters"),

  // Email
  body("email")
    .optional({ checkFalsy: true })
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (email: string) => {
      const user = await UserModel.findOne({ email });
      if (user?.email === email) return;
      if (user) {
        throw new Error("Email already exists");
      }
    }),

  // Password
  body("password")
    .optional({ checkFalsy: true })
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    ),

  // Confirm Password
  body("cpassword")
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      if (req.body.password && value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // Gender
  body("gender")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Gender is required"),

  // Is Orthodox Jew
  body("isOrthodoxJew")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Orthodox Jew status must be 'Yes' or 'No'"),

  // Marital Status
  body("maritalStatus")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Marital status is required"),

  // Keeps Mitzvos
  body("keepsMitzvos")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Keeps mitzvos must be 'Yes' or 'No'"),

  // Chafifa Duration
  body("chafifaDuration")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Chafifa duration is required"),

  // Chicken Soup in Dairy Sink
  body("chickenSoupInDairySink")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Please select an option for chicken soup in dairy sink"),

  body("oldPassword")
    .optional({ checkFalsy: true })
    .custom(async (oldPassword, { req }) => {
      // If newPassword exists, oldPassword must exist
      if (req.body.newPassword && !oldPassword) {
        throw new Error("Old password is required");
      }

      // If oldPassword provided, verify it
      if (oldPassword) {
        const user = await UserModel.findById(req.body.userId).select(
          "password"
        );
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          throw new Error("Old password is incorrect");
        }
      }
      return true;
    }),

  /* ---------- NEW PASSWORD ---------- */
  body("newPassword")
    .optional({ checkFalsy: true })
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "New password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    )
    .custom((newPassword, { req }) => {
      if (req.body.oldPassword && newPassword === req.body.oldPassword) {
        throw new Error("New password must be different from old password");
      }
      return true;
    }),
];

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();
  const file = req.file;

  if (Object.keys(errors).length > 0 && file) {
    deleteFileFromLocal(file.filename, "profile");
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
