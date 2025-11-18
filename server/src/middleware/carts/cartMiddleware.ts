import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const cartValidationRules = [
  body("product")
    .isMongoId()
    .withMessage("Product must be a valid MongoDB ObjectId"),

  body("customer")
    .isMongoId()
    .withMessage("Customer must be a valid MongoDB ObjectId"),

  body("totalProduct").notEmpty().withMessage("totalProduct is required"),

  body("totalPrice").notEmpty().withMessage("totalPrice is required!"),
];

export const validateCart = (
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
