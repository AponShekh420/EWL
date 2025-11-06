import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { deleteFileFromLocal } from "../../utils/deleteFileFromLocal";
import { getImageUrl } from "../../utils/getImageUrl";

export const productValidationRules = [
  body("creator").notEmpty().withMessage("Creator is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("productTags")
    .isArray({ min: 1 })
    .withMessage("Product tags must be an array with at least one tag"),
  body("shortDescription")
    .notEmpty()
    .withMessage("Short description is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("sku").notEmpty().withMessage("SKU is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),
  body("regularPrice")
    .isNumeric()
    .withMessage("Regular price must be a number"),
  body("salePrice").isNumeric().withMessage("Sale price must be a number"),
  body("stock").isNumeric().withMessage("Stock must be a number"),
  body("stockStatus").notEmpty().withMessage("Stock status is required"),
  body("isVisibleProductPage")
    .isBoolean()
    .withMessage("isVisibleProductPage must be boolean"),
  body("trackStockQuantity")
    .isBoolean()
    .withMessage("trackStockQuantity must be boolean"),
  body("limitOneItemPerOrder")
    .isBoolean()
    .withMessage("limitOneItemPerOrder must be boolean"),
  body("weight").notEmpty().withMessage("Weight is required"),
  body("declaredValue")
    .isNumeric()
    .withMessage("Declared value must be a number"),
  body("dimensionLength")
    .notEmpty()
    .withMessage("Dimension length is required"),
  body("dimensionWidth").notEmpty().withMessage("Dimension width is required"),
  body("dimensionHeight")
    .notEmpty()
    .withMessage("Dimension height is required"),
  body("taxStatus").notEmpty().withMessage("Tax status is required"),
  body("taxClass").notEmpty().withMessage("Tax class is required"),
  body("shippingClass").notEmpty().withMessage("Shipping class is required"),
  body("enelope").isBoolean().withMessage("Enelope must be boolean"),
  body("customMessage").notEmpty().withMessage("Custom message is required"),
  body("checkoutPageMessage")
    .notEmpty()
    .withMessage("Checkout page message is required"),
  body("metaData").notEmpty().withMessage("Meta data is required"),
  body("metaDescription")
    .notEmpty()
    .withMessage("Meta description is required"),
];

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).mapped();

  const { images, thumbnail, attachment } = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (!images?.length) {
    errors.images = {
      type: "field",
      msg: "images is required",
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
        const imgPath = getImageUrl(req, "products", file);
        deleteFileFromLocal(imgPath, "/images/products");
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
