import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const reviewValidationRules = [
  body("productId")
    .isMongoId()
    .withMessage("ProductId must be a valid MongoDB ObjectId"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating is number"),
  body("review").notEmpty().withMessage("Review is required!"),
];
export const reviewUpdateValidationRules = [
  body("productId").isMongoId().optional(),
  body("rating").isNumeric().optional(),
  body("review").optional(),
  body("status").optional(),
];

export const validateReview = (
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
