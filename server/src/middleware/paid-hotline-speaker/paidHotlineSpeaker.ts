import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const paidHotlineSpeakerRules = [
  body("fullname").notEmpty().withMessage("Fullname is required"),
  body("speciality").notEmpty().withMessage("Speciality is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("gender").optional().isIn(["male", "female"]),
];

export const validatePaidHotlineSpeaker = (
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
