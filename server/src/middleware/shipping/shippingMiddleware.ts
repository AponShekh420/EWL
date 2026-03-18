import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const shippingValidationRules = [
  body("zoneName").notEmpty().withMessage("Zone name is required!"),
  body("region").notEmpty().withMessage("Region is required!"),
  body("shippingMethods")
    .notEmpty()
    .withMessage("Shipping methods is required")
    .custom((value) => {
      try {
        if (!Array.isArray(value)) {
          throw new Error("Must be an array");
        }
        if (value.length === 0) {
          throw new Error("Shipping methods cannot be empty");
        }
        return true;
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : "Invalid shipping methods",
        );
      }
    }),
];

export const validateShipping = (
  req: Request,
  res: Response,
  next: NextFunction,
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
