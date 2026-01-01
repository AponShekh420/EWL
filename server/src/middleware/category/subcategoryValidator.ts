import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";
import { getImageUrl } from "../../utils/getImageUrl";

export const subcategoryValidationRules = [
  body("name").notEmpty().withMessage("Subcategory name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Category ID must be a valid MongoDB ObjectId"),
];

export const validateSubcategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();

  const file = req.file as Express.Multer.File;

  if (!file) {
    errors.thumbnail = {
      type: "field",
      msg: "thumbnail is required",
      path: "thumbnail",
      location: "body",
    };
  }

  //Delete handler for uploaded files if has error
  const imageDeleteHandler = () => {
    const imgPath = getImageUrl(req, "category", file);
    deleteFileFromLocal(imgPath, "category");
  };

  if (Object.keys(errors).length > 0) {
    file && imageDeleteHandler();
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }
  next();
};
