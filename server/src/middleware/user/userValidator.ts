import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import UserModel from "../../models/UserModel";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";
import { getImageUrl } from "../../utils/getImageUrl";

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

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();
  const file = req.file;

  if (Object.keys(errors).length > 0 && file) {
    const imgPath = getImageUrl(req, "profile", file);
    deleteFileFromLocal(imgPath, "profile");
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
