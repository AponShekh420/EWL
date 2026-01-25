import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const courseValidationRules = [
  body("creator").notEmpty().withMessage("Creator is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("lectures").notEmpty().withMessage("lectures is required"),
  body("time").notEmpty().withMessage("time is required"),
  body("duration").notEmpty().withMessage("duration is required"),
  body("date").notEmpty().withMessage("date is required"),
  body("aboutTab").notEmpty().withMessage("About Tab is required"),
  body("overviewTab").notEmpty().withMessage("Overview Tab is required"),
  body("courseTopicsTab").notEmpty().withMessage("Course Topics Tab is required"),
  body("speakerProfileTab").notEmpty().withMessage("Speaker Profile Tab is required"),
  body("FAQsTab").notEmpty().withMessage("FAQs Tab is required"),
  body("testimonialsTab").notEmpty().withMessage("Testimonials Tab is required"),
  body("moreInfoTab").notEmpty().withMessage("Category is required"),
  body("students")
    .isNumeric()
    .withMessage("students must be a number"),
  body("speaker").notEmpty().withMessage("speaker is required"),
  body("status").notEmpty().withMessage("status is required"),
  body("ExternalLink").notEmpty().withMessage("External Link is required"),
  body("limitOneItemPerOrder")
    .isBoolean()
    .withMessage("limitOneItemPerOrder must be boolean"),
  body("customMessage").notEmpty().withMessage("Custom message is required"),
  body("checkoutPageMessage")
    .notEmpty()
    .withMessage("Checkout page message is required"),
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

  if (!attachment?.length) {
    errors.attachment = {
      type: "field",
      msg: "Attachment is required",
      path: "attachment",
      location: "body",
    };
  }

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
