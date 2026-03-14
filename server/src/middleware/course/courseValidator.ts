import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const courseValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("speaker").notEmpty().withMessage("Speaker is required"),
  body("status").notEmpty().withMessage("Status is required"),
  body("offline")
  .optional()
  .isIn(["true", "false"])
  .withMessage("Invalid offline value"),

  body("externalLink")
    .if((value, { req }) => req.body.offline === "true")
    .notEmpty()
    .withMessage("External Link is required when offline is true")
    .isURL()
    .withMessage("External Link must be a valid URL"),
  body("metaTitle").optional(),
  body("metaDescription").optional(),
  body("slug").optional(),
];

export const validateCourse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();

  const { thumbnail, attachment } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (!thumbnail?.length) {
    errors.thumbnail = {
      type: "field",
      msg: "Thumbnail is required",
      path: "thumbnail",
      location: "body",
    };
  }

  // if (!attachment?.length) {
  //   errors.attachment = {
  //     type: "field",
  //     msg: "Attachment is required",
  //     path: "attachment",
  //     location: "body",
  //   };
  // }

  //Delete handler for uploaded files if has error
  const imageDeleteHandler = () => {
    if (req.files) {
      const files = Object.values(
        req.files as any
      ).flat() as Express.Multer.File[];
      files.forEach((file) => {
        deleteFileFromLocal(file.filename, "courses");
      });
    }
  };

  if (Object.keys(errors).length > 0) {
    imageDeleteHandler();
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }
  next();
};
export const validateUpdateCourse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();
  const imageDeleteHandler = () => {
    if (req.files) {
      const files = Object.values(
        req.files as any
      ).flat() as Express.Multer.File[];
      files.forEach((file) => {
        deleteFileFromLocal(file.filename, "courses");
      });
    }
  };
  if (Object.keys(errors).length > 0) {
    imageDeleteHandler();
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};
