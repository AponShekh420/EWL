import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const orderValidationRules = [
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one product"),

  body("products.*")
    .isMongoId()
    .withMessage("Each product must be a valid MongoDB ObjectId"),

  body("customer")
    .notEmpty()
    .withMessage("Customer is required")
    .isMongoId()
    .withMessage("Customer must be a valid MongoDB ObjectId"),

  body("status")
    .optional()
    .isIn(["pending", "completed", "cancelled", "refunded"])
    .withMessage("Invalid order status"),

  body("totalProduct")
    .notEmpty()
    .withMessage("Total product count is required")
    .isNumeric()
    .withMessage("Total product must be a number"),

  body("totalPrice")
    .notEmpty()
    .withMessage("Total price is required")
    .isNumeric()
    .withMessage("Total price must be a number"),

  body("oderNote").optional().isString(),

  // Billing Info
  body("billingInfo.customerName")
    .notEmpty()
    .withMessage("Billing customer name is required"),
  body("billingInfo.phoneNumber")
    .notEmpty()
    .withMessage("Billing phone number is required"),
  body("billingInfo.country")
    .notEmpty()
    .withMessage("Billing country is required"),
  body("billingInfo.state").notEmpty().withMessage("Billing state is required"),
  body("billingInfo.city").notEmpty().withMessage("Billing city is required"),
  body("billingInfo.zip").notEmpty().withMessage("Billing zip is required"),
  body("billingInfo.streetAddress")
    .notEmpty()
    .withMessage("Billing street address is required"),

  // Shipping Info
  body("shippingInfo.customerName")
    .notEmpty()
    .withMessage("Shipping customer name is required"),
  body("shippingInfo.phoneNumber")
    .notEmpty()
    .withMessage("Shipping phone number is required"),
  body("shippingInfo.country")
    .notEmpty()
    .withMessage("Shipping country is required"),
  body("shippingInfo.state")
    .notEmpty()
    .withMessage("Shipping state is required"),
  body("shippingInfo.city").notEmpty().withMessage("Shipping city is required"),
  body("shippingInfo.zip").notEmpty().withMessage("Shipping zip is required"),
  body("shippingInfo.streetAddress")
    .notEmpty()
    .withMessage("shipping street address is required"),

  // Payment Info
  body("paymentInfo.paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required"),

  body("paymentInfo.shippingMethod")
    .notEmpty()
    .withMessage("Shipping method is required"),

  body("paymentInfo.oderDate").optional(),
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
