import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const orderValidationRules = [

  // -------------------------
  // Customer Info
  // -------------------------
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

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

  body("streetAddressTwo")
    .optional()
    .isString(),

  // -------------------------
  // Order Info
  // -------------------------

  body("totalProduct")
    .isNumeric()
    .withMessage("Total product is required"),

  body("subtotal")
    .isNumeric()
    .withMessage("Subtotal must be numeric"),

  body("tax")
    .optional()
    .isNumeric()
    .withMessage("Tax must be numeric"),

  body("orderNotes")
    .optional()
    .isString(),

  // -------------------------
  // Products Array
  // -------------------------

  body("products")
    .isArray({ min: 1 })
    .withMessage("At least one product required"),

  body("products.*._id")
    .isMongoId()
    .withMessage("Invalid product id"),

  body("products.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("products.*.price")
    .isFloat({ min: 0 })
    .withMessage("Price must be valid"),

  // -------------------------
  // Shipping Object
  // -------------------------

  body("shipping.methodName")
    .optional()
    .isString(),

  body("shipping.cost")
    .optional()
    .isFloat({ min: 0 }),

  body("shipping.boxUsed")
    .optional()
    .isString(),

  body("shipping.finalWeightOz")
    .optional()
    .isFloat({ min: 0 }),

  body("shipping.servicelevel")
    .optional()
    .isString(),

  // -------------------------
  // Shipping Class Rates
  // -------------------------

  body("shippingClassRates")
    .optional()
    .isArray(),

  body("shippingClassRates.*._id")
    .optional()
    .isString(),

  body("shippingClassRates.*.shippingCost")
    .optional()
    .isFloat({ min: 0 }),

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

  body("isDifferentBillingAddress")
  .optional()
  .isBoolean(),

  body("differentBillingAddress.firstName")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing first name required"),

  body("differentBillingAddress.lastName")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing last name required"),

  body("differentBillingAddress.email")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .isEmail()
    .withMessage("Billing email is invalid"),

  body("differentBillingAddress.spouseName")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing spouse name required"),

  body("differentBillingAddress.phoneNumber")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing phone number required"),

  body("differentBillingAddress.country")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing country required"),

  body("differentBillingAddress.state")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing state required"),

  body("differentBillingAddress.city")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing city required"),

  body("differentBillingAddress.zip")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing zip required"),

  body("differentBillingAddress.streetAddress")
    .if((value, { req }) => req.body.isDifferentBillingAddress === true)
    .notEmpty()
    .withMessage("Billing street address required"),

];

export const validateOrder = (
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
