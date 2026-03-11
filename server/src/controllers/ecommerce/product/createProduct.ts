import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { getFilterBodyData } from "./../../../utils/getFilterBodyData";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { images, thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    // Remove special characters and make the slug
    const sanitizedTitle = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "");

    const sanitizedMetaTitle = body.metaTitle
      ? body.metaTitle
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
      : body.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "");

    let metaSlug = sanitizedMetaTitle.split(" ").join("-");
    let slug = sanitizedTitle.split(" ").join("-");
    // Check for duplicates
    const duplicateProductSlugCount = await productModel.countDocuments({
      slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateProductSlugCount > 0) {
      slug = `${slug}-${duplicateProductSlugCount}`;
    }

    const duplicateProductMetaSlugCount = await productModel.countDocuments({
      metaSlug: { $regex: `^${metaSlug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateProductMetaSlugCount > 0) {
      metaSlug = `${metaSlug}-${duplicateProductMetaSlugCount}`;
    }

    const createdProduct = await productModel.create({
      ...body,
      slug,
      metaSlug,
      thumbnail: thumbnail[0].filename,
      attachment: attachment[0].filename,
      images: images.map((file) => file.filename),
    });

    if (!createdProduct) {
      return next(createError(400, "Failed to create product"));
    }
    await CategoryModel.findOneAndUpdate(
      { name: createdProduct.category },
      { $push: { products: createdProduct._id } },
      { new: true }, // Optional: returns the updated document
    );
    return res.status(201).json({
      success: true,
      status: 201,
      data: createdProduct,
      message: "Product created successfully",
    });
  } catch (error: unknown) {
    catchErrorSend(next, error);
  }
};
