import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const classOrderValidationRules = [

  // -------------------------
  // Customer Info
  // -------------------------
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("spouseName")
    .trim()
    .notEmpty()
    .withMessage("Spouse name is required"),

  body("howDidYouHearAboutUs")
    .trim()
    .notEmpty()
    .withMessage("How did you hear about us is required"),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("otherPhoneNumber")
    .optional({ nullable: true, checkFalsy: true })
    .isString(),

  body("country")
    .notEmpty()
    .withMessage("Country is required"),

  body("state")
    .notEmpty()
    .withMessage("State is required"),

  body("city")
    .notEmpty()
    .withMessage("City is required"),

  body("zip")
    .trim()
    .notEmpty()
    .withMessage("Zip is required"),

  body("streetAddress")
    .trim()
    .notEmpty()
    .withMessage("Street address is required"),

  body("apartment")
    .optional()
    .isString(),

  // -------------------------
  // Order Info
  // -------------------------

  body("totalClass")
    .isNumeric()
    .withMessage("Total Class is required"),

  body("subtotal")
    .isNumeric()
    .withMessage("Subtotal must be numeric"),

  body("orderNotes")
    .optional()
    .isString(),

  // -------------------------
  // Products Array
  // -------------------------

  body("classes")
    .isArray({ min: 1 })
    .withMessage("At least one class required"),

  body("classes.*._id")
    .isMongoId()
    .withMessage("Invalid class id"),

  body("classes.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("classes.*.price")
    .isFloat({ min: 0 })
    .withMessage("Price must be valid"),


  // -------------------------
  // Status Validation
  // -------------------------

  body("paymentStatus")
    .optional()
    .isIn([
      "pending",
      "paid",
      "failed",
      "refunded"
    ]),

  body("status")
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

];

export const validateClassOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }
  next();
};
