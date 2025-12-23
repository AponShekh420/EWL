import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { CategoryModel } from "../../../models/CategoryModel";
import productModel from "../../../models/ProductModel";
import { catchErrorSend } from "../../../utils/catchErrorSend";
import { getImageUrl } from "../../../utils/getImageUrl";
import { getFilterBodyData } from "./../../../utils/getFilterBodyData";

type MulterFile = {
  [fieldname: string]: Express.Multer.File[];
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { images, thumbnail, attachment } = req.files as MulterFile;
    const body = getFilterBodyData(req);
    // Remove special characters and make the slug
    const sanitizedTitle = body.metaTitle
      ? body.metaTitle
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
      : body.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "");

    let slug = sanitizedTitle.split(" ").join("-");
    // Check for duplicates
    const duplicateCommunityCount = await productModel.countDocuments({
      slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
    });

    if (duplicateCommunityCount > 0) {
      slug = `${slug}-${duplicateCommunityCount}`;
    }

    const createdProduct = await productModel.create({
      ...body,
      slug,
      thumbnail: getImageUrl(req, "products", thumbnail[0]),
      attachment: getImageUrl(req, "products", attachment[0]),
      images: images.map((file) => getImageUrl(req, "products", file)),
    });

    if (!createdProduct) {
      return next(createError(400, "Failed to create product"));
    }
    await CategoryModel.findOneAndUpdate(
      { name: createdProduct.category },
      { $push: { products: createdProduct._id } },
      { new: true } // Optional: returns the updated document
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
