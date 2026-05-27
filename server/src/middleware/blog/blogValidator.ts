import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const blogValidationRules = [
  body("creator").notEmpty().withMessage("Creator is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("tags")
    .optional(),
 
  body("description").optional(),
  body("metaTitle").optional(),
  body("metaDescription").optional(),
  body("slug").optional(),
];

export const validateBlog = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).mapped();

  const { images, thumbnail } = req.files as {
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


  //Delete handler for uploaded files if has error
  const imageDeleteHandler = () => {
    if (req.files) {
      const files = Object.values(
        req.files as any,
      ).flat() as Express.Multer.File[];
      files.forEach((file) => {
        deleteFileFromLocal(file.filename, "blogs");
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
export const validateUpdateBlog = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).mapped();
  const imageDeleteHandler = () => {
    if (req.files) {
      const files = Object.values(
        req.files as any,
      ).flat() as Express.Multer.File[];
      files.forEach((file) => {
        deleteFileFromLocal(file.filename, "blogs");
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
