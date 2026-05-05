import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";

export const productValidationRules = [
  body("creator").notEmpty().withMessage("Creator is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("tags")
    .optional(),
  body("shortDescription")
    .notEmpty()
    .withMessage("Short description is required"),
  body("description").optional(),
  body("sku")
    .optional(),
  body("isbn")
    .optional(),

  body("regularPrice").optional(),
  body("salePrice").isNumeric().withMessage("Sale price must be a number"),
  body("stock").optional(),
  body("stockStatus").optional(),
  body("isVisibleProductPage")
    .isBoolean()
    .withMessage("isVisibleProductPage must be boolean"),
  body("trackStockQuantity")
    .optional(),
  body("limitOneItemPerOrder")
    .optional(),
  body("weight").optional(),
  body("declaredValue")
    .optional(),
  body("dimensionLength")
    .optional(),
  body("dimensionWidth").optional(),
  body("dimensionHeight")
    .optional(),
  body("taxStatus").optional(),
  body("enelope").optional(),
  body("customMessage").optional(),
  body("checkoutPageMessage").optional(),
  body("metaTitle").optional(),
  body("metaDescription").optional(),
  body("slug").optional(),
];

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).mapped();

  const { images, thumbnail, attachment } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (!images?.length) {
    errors.images = {
      type: "field",
      msg: "Feature images is required",
      path: "images",
      location: "body",
    };
  }

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
        req.files as any,
      ).flat() as Express.Multer.File[];
      files.forEach((file) => {
        deleteFileFromLocal(file.filename, "products");
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
export const validateUpdateProduct = (
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
        deleteFileFromLocal(file.filename, "products");
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
